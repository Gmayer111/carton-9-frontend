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
import { TAuthor } from "src/types/author";
import { useAuthors } from "src/hooks/author.hook";
import { AuthorService } from "src/services/author.service";

type TAuthorTableData = TTableGeneric<
  TAuthor & {
    actions: string;
  }
>;

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState<boolean>(false);
  const { data: authors, isError, isLoading } = useAuthors();
  const [selectedAuthor, setSelectedAuthor] = useState<TAuthor>();
  const [displayModal, setDisplayModal] = useState("");
  const queryClient = useQueryClient();

  const defaultValues: TAuthor = {
    userName: selectedAuthor?.userName || "",
    firstName: selectedAuthor?.firstName || "",
    lastName: selectedAuthor?.lastName || "",
    link: selectedAuthor?.link || "",
    description: selectedAuthor?.description || "",
  };

  const methods = useForm<TAuthor | FieldValues>({
    defaultValues: selectedAuthor,
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
          placeholder: "Hergé",
          label: "Nom d'auteur",
          name: "userName",
          registerOptions: {
            required: {
              value: true,
              message: "Le nom d'auteur est obligatoire",
            },
          },
        },
        {
          fieldElement: "input",
          inputType: "text",
          placeholder: "Jean",
          label: "Prénom",
          name: "firstName",
        },
        {
          fieldElement: "input",
          inputType: "text",
          placeholder: "Dupont",
          label: "Nom",
          name: "lastName",
        },

        {
          fieldElement: "input",
          inputType: "text",
          placeholder: "http://...",
          label: "Site web de l'auteur",
          name: "link",
        },
      ],
    },
    {
      columnSide: "right",
      items: [
        {
          fieldElement: "textarea",
          placeholder: "Description",
          label: "Description",
          name: "description",
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
    mutationFn: (data: TAuthor | FieldValues) => {
      return isEditModal
        ? AuthorService.update(selectedAuthor?.id, data)
        : AuthorService.create(data);
    },
    onMutate: async (newAuthor) => {
      await queryClient.cancelQueries({
        queryKey: ["authors", selectedAuthor?.id],
      });
      const previousAuthors = queryClient.getQueryData([
        "authors",
        selectedAuthor?.id,
      ]);
      queryClient.setQueryData(["authors", selectedAuthor?.id], newAuthor);
      return { previousAuthors, newAuthor };
    },
    mutationKey: ["authors"],
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      handleCloseModal();
    },
  });

  const handleSubmitAuthor: SubmitHandler<TAuthor | FieldValues> = (data) => {
    updateOrCreateMutation.mutate(data);
  };

  const deleteMutation = useMutation({
    mutationFn: () => {
      return AuthorService.delete(selectedAuthor?.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      handleCloseModal();
    },
  });

  const handleDeleteAuthor = async () => {
    deleteMutation.mutate();
    handleCloseModal();
  };

  if (isError || !authors) return <div>Erreur</div>;

  if (isLoading) return <div>...</div>;

  const dataRows: Array<TAuthorTableData> = authors?.data.map((author) => ({
    ...author,
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
        dashboardTitle="Auteurs"
        handleAction={setDisplayModal}
        data={dataRows}
        selectedItem={setSelectedAuthor}
        columns={[
          {
            key: "userName",
            header: "Nom d'auteur",
          },
          {
            key: "lastName",
            header: "Nom",
          },
          {
            key: "firstName",
            header: "Prénom",
          },
          {
            key: "link",
            header: "Site web / Portfolio",
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
        handleSubmit={handleSubmitAuthor}
        modalHeaderTitle={
          isOpenModal ? "Ajouter un auteur" : "Modifier un auteur"
        }
      />
      <CancelModal
        displayModal={isOpenCancelModal}
        closeModal={handleCloseModal}
        handleDeleteItem={handleDeleteAuthor}
      />
    </div>
  );
}
