"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { TFields } from "src/components/common/form/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import DropdownButton from "src/components/common/form/form-fields/dropdown-button/dropdown-button.component";
import CancelModal from "src/components/common/modal/cancel-modal.component";
import CreateModal from "src/components/common/modal/create-modal.component";
import { TTableGeneric } from "src/components/common/table/table.component";
import TableDashboard from "src/components/dashboard/table-dashboard.component";
import { TCollection } from "src/types/collection";
import { useCollections } from "src/hooks/collection.hook";
import { CollectionService } from "src/services/collection.service";

type TCollectionData = TTableGeneric<
  TCollection & {
    actions: string;
  }
>;

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState<boolean>(false);
  const { data: collections, isError, isLoading } = useCollections();
  const [selectedCollection, setSelectedCollection] = useState<TCollection>();
  const queryClient = useQueryClient();

  const defaultValues: TCollection = {
    total: selectedCollection?.total || 0,
    name: selectedCollection?.name || "",
  };

  const methods = useForm<TCollection | FieldValues>({
    defaultValues: selectedCollection,
  });

  useEffect(() => {
    if (isEditModal) {
      methods.reset(defaultValues, {
        keepValues: false,
        keepDefaultValues: true,
      });
    } else {
      methods.reset();
    }
  }, [isEditModal, isOpenModal]);

  const fields: TFields[] = [
    {
      columnSide: "left",
      items: [
        {
          fieldElement: "input",
          inputType: "text",
          placeholder: "Collection Tintin",
          label: "Nom de la collection",
          name: "name",
        },
      ],
    },
  ];

  const handleCloseModal = () => {
    if (isOpenModal) setIsOpenModal(false);
    if (isEditModal) setIsEditModal(false);
    if (isOpenCancelModal) setIsOpenCancelModal(false);
  };

  const updateOrCreateMutation = useMutation({
    mutationFn: (data: TCollection | FieldValues) => {
      return isEditModal
        ? CollectionService.update(selectedCollection?.id, data)
        : CollectionService.create(data);
    },
    onMutate: async (newCollection) => {
      await queryClient.cancelQueries({
        queryKey: ["authors", selectedCollection?.id],
      });
      const previousCollections = queryClient.getQueryData([
        "collections",
        selectedCollection?.id,
      ]);
      queryClient.setQueryData(
        ["collections", selectedCollection?.id],
        newCollection
      );
      return { previousCollections, newCollection };
    },
    mutationKey: ["collections"],
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      handleCloseModal();
    },
  });

  const handleSubmitCollection: SubmitHandler<TCollection | FieldValues> = (
    data
  ) => {
    updateOrCreateMutation.mutate(data);
  };

  const deleteMutation = useMutation({
    mutationFn: () => {
      return CollectionService.delete(selectedCollection?.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      handleCloseModal();
    },
  });

  const handleDeleteCollection = async () => {
    deleteMutation.mutate();
    handleCloseModal();
  };

  if (isError || !collections) return <div>Erreur</div>;

  if (isLoading) return <div>...</div>;

  const dataRows: Array<TCollectionData> = collections?.data.map(
    (collection) => ({
      ...collection,
      actions: (
        <DropdownButton
          listItems={[
            {
              content: "Modifier",
              onClickAction: () => setIsEditModal(true),
            },
            {
              content: "Supprimer",
              onClickAction: () => setIsOpenCancelModal(true),
            },
          ]}
          type="button"
          hasIconButton={true}
        />
      ),
    })
  );

  return (
    <div className="dashboard-container">
      <TableDashboard
        dashboardTitle="Collections"
        handleDisplayModal={() => setIsOpenModal(true)}
        data={dataRows}
        selectedItem={setSelectedCollection}
        columns={[
          {
            key: "name",
            header: "Nom de la collection",
          },
          {
            key: "total",
            header: "Nombre total d'albums",
          },
          {
            key: "actions",
            header: "Actions",
          },
        ]}
      />
      <CreateModal
        modalFields={fields}
        displayModal={isOpenModal || isEditModal}
        isEditModal={isEditModal}
        closeModal={handleCloseModal}
        formMethods={methods}
        handleSubmit={handleSubmitCollection}
        modalHeaderTitle={
          isOpenModal ? "Ajouter une collection" : "Modifier une collection"
        }
      />
      <CancelModal
        displayModal={isOpenCancelModal}
        closeModal={handleCloseModal}
        handleDeleteItem={handleDeleteCollection}
      />
    </div>
  );
}
