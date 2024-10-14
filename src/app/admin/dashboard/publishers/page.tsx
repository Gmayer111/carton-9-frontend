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
import { TPublisher } from "src/types/publisher";
import { usePublishers } from "src/hooks/publisher.hook";
import { PublisherService } from "src/services/publisher.service";

type TPublisherData = TTableGeneric<
  TPublisher & {
    actions: string;
  }
>;

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState<boolean>(false);
  const { data: publishers, isError, isLoading } = usePublishers();
  const [selectedPublisher, setSelectedPublisher] = useState<TPublisher>();
  const [displayModal, setDisplayModal] = useState("");
  const queryClient = useQueryClient();

  const defaultValues: TPublisher = {
    name: selectedPublisher?.name || "",
    address: selectedPublisher?.address || "",
    zipcode: selectedPublisher?.zipcode || "",
    city: selectedPublisher?.city || "",
    country: selectedPublisher?.country || "",
  };

  const methods = useForm<TPublisher | FieldValues>({
    defaultValues: selectedPublisher,
  });

  useEffect(() => {
    if (displayModal === "editModal") {
      setIsEditModal(true);
    }

    if (displayModal === "openModal") {
      setIsOpenModal(true);
    }
    setDisplayModal("");
  }, [displayModal]);

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
          placeholder: "Terre de légendes",
          label: "Nom de l'éditeur",
          name: "name",
          registerOptions: {
            required: {
              value: true,
              message: "Le nom de l'éditeur est obligatoire",
            },
          },
        },
        {
          fieldElement: "input",
          inputType: "text",
          placeholder: "10 rue ...",
          label: "Rue",
          name: "address",
          registerOptions: {
            required: {
              value: true,
              message: "L'adresse est obligatoire",
            },
          },
        },
      ],
    },
    {
      columnSide: "right",
      items: [
        {
          fieldElement: "input",
          inputType: "text",
          placeholder: "Paris",
          label: "Ville",
          name: "city",
          registerOptions: {
            required: {
              value: true,
              message: "La ville est obligatoire",
            },
          },
        },
        {
          fieldElement: "input",
          inputType: "text",
          placeholder: "France",
          label: "Pays",
          name: "country",
          registerOptions: {
            required: {
              value: true,
              message: "Le pays est obligatoire",
            },
          },
        },
        {
          fieldElement: "input",
          inputType: "text",
          placeholder: "75000",
          label: "Code postal",
          name: "zipcode",
          registerOptions: {
            required: {
              value: true,
              message: "Le code postal est obligatoire",
            },
          },
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
    mutationFn: (data: TPublisher | FieldValues) => {
      return isEditModal
        ? PublisherService.update(selectedPublisher?.id, data)
        : PublisherService.create(data);
    },
    onMutate: async (newPublisher) => {
      await queryClient.cancelQueries({
        queryKey: ["publishers", selectedPublisher?.id],
      });
      const previousPublishers = queryClient.getQueryData([
        "publishers",
        selectedPublisher?.id,
      ]);
      queryClient.setQueryData(
        ["publishers", selectedPublisher?.id],
        newPublisher
      );
      return { previousPublishers, newPublisher };
    },
    mutationKey: ["publishers"],
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["publishers"] });
      handleCloseModal();
    },
  });

  const handleSubmitPublisher: SubmitHandler<TPublisher | FieldValues> = (
    data
  ) => {
    updateOrCreateMutation.mutate(data);
  };

  const deleteMutation = useMutation({
    mutationFn: () => {
      return PublisherService.delete(selectedPublisher?.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publishers"] });
      handleCloseModal();
    },
  });

  const handleDeletePublisher = async () => {
    deleteMutation.mutate();
    handleCloseModal();
  };

  if (isError || !publishers) return <div>Erreur</div>;

  if (isLoading) return <div>...</div>;

  const dataRows: Array<TPublisherData> = publishers?.data.map((publisher) => ({
    ...publisher,
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
  }));

  return (
    <div className="dashboard-container">
      <TableDashboard
        dashboardTitle="Editeurs"
        handleAction={setDisplayModal}
        data={dataRows}
        selectedItem={setSelectedPublisher}
        columns={[
          {
            key: "name",
            header: "Nom de l'éditeur",
          },
          {
            key: "address",
            header: "Adresse",
          },
          {
            key: "city",
            header: "Ville",
          },
          {
            key: "zipcode",
            header: "Code postal",
          },
          {
            key: "country",
            header: "Pays",
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
        handleSubmit={handleSubmitPublisher}
        modalHeaderTitle={
          isOpenModal ? "Ajouter un éditeur" : "Modifier un éditeur"
        }
      />
      <CancelModal
        displayModal={isOpenCancelModal}
        closeModal={handleCloseModal}
        handleDeleteItem={handleDeletePublisher}
      />
    </div>
  );
}
