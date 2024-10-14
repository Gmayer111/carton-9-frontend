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
import { TCategory } from "src/types/category";
import { useCategoriess } from "src/hooks/category.hook";
import { CategoryService } from "src/services/category.service";

type TCategoryData = TTableGeneric<
  TCategory & {
    actions: string;
  }
>;

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState<boolean>(false);
  const { data: categories, isError, isLoading } = useCategoriess();
  const [selectedCategory, setSelectedCategory] = useState<TCategory>();
  const [displayModal, setDisplayModal] = useState("");
  const queryClient = useQueryClient();

  const defaultValues: TCategory = {
    label: selectedCategory?.label || "",
  };

  const methods = useForm<TCategory | FieldValues>({
    defaultValues: selectedCategory,
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
          placeholder: "Humour",
          label: "Catégorie",
          name: "label",
          registerOptions: {
            required: {
              value: true,
              message: "La catégorie est obligatoire",
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
    mutationFn: (data: TCategory | FieldValues) => {
      return isEditModal
        ? CategoryService.update(selectedCategory?.id, data)
        : CategoryService.create(data);
    },
    onMutate: async (newCategory) => {
      await queryClient.cancelQueries({
        queryKey: ["categories", selectedCategory?.id],
      });
      const previousCategories = queryClient.getQueryData([
        "categories",
        selectedCategory?.id,
      ]);
      queryClient.setQueryData(
        ["categories", selectedCategory?.id],
        newCategory
      );
      return { previousCategories, newCategory };
    },
    mutationKey: ["categories"],
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      handleCloseModal();
    },
  });

  const handleSubmitCategory: SubmitHandler<TCategory | FieldValues> = (
    data
  ) => {
    updateOrCreateMutation.mutate(data);
  };

  const deleteMutation = useMutation({
    mutationFn: () => {
      return CategoryService.delete(selectedCategory?.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      handleCloseModal();
    },
  });

  const handleDeleteCategory = async () => {
    deleteMutation.mutate();
    handleCloseModal();
  };

  if (isError || !categories) return <div>Erreur</div>;

  if (isLoading) return <div>...</div>;

  const dataRows: Array<TCategoryData> = categories?.data.map((category) => ({
    ...category,
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
        dashboardTitle="Catégories"
        handleAction={setDisplayModal}
        data={dataRows}
        selectedItem={setSelectedCategory}
        columns={[
          {
            key: "label",
            header: "Catégorie",
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
        handleSubmit={handleSubmitCategory}
        modalHeaderTitle={
          isOpenModal ? "Ajouter une catégorie" : "Modifier une catégorie"
        }
      />
      <CancelModal
        displayModal={isOpenCancelModal}
        closeModal={handleCloseModal}
        handleDeleteItem={handleDeleteCategory}
      />
    </div>
  );
}
