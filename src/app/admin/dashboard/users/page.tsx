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
import { useUsers } from "src/hooks/user.hook";
import { UserService } from "src/services/user.service";
import { TUser } from "src/types/user";

type TUserTableData = TTableGeneric<
  TUser & {
    actions: string;
  }
>;

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState<boolean>(false);
  const { data: users, isError, isLoading } = useUsers();
  const [selectedUser, setSelectedUser] = useState<TUser>();
  const [displayModal, setDisplayModal] = useState("");

  const queryClient = useQueryClient();

  const defaultValues: TUser = {
    firstName: selectedUser?.firstName || "",
    lastName: selectedUser?.lastName || "",
    email: selectedUser?.email || "",
    birthdate: selectedUser?.birthdate || undefined,
    description: selectedUser?.description || "",
    nationality: selectedUser?.nationality || "",
    password: selectedUser?.password || "",
  };

  const methods = useForm<TUser | FieldValues>({
    defaultValues: selectedUser,
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
          placeholder: "Jean",
          label: "Prénom",
          name: "firstName",
          registerOptions: {
            required: {
              value: true,
              message: "Le prénom est obligatoire",
            },
          },
        },
        {
          fieldElement: "input",
          inputType: "text",
          placeholder: "Dupont",
          label: "Nom",
          name: "lastName",
          registerOptions: {
            required: {
              value: true,
              message: "Le nom est obligatoire",
            },
          },
        },
        {
          fieldElement: "input",
          inputType: "email",
          placeholder: "jean.dupont@mail.fr",
          label: "Email",
          name: "email",
          registerOptions: {
            required: {
              value: true,
              message: "L'email est obligatoire",
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Le format de l'email n'est pas bon",
            },
          },
        },
        {
          fieldElement: "input",
          inputType: "date",
          placeholder: "24/04/1988",
          label: "Date de naissance",
          name: "birthdate",
        },
      ],
    },
    {
      columnSide: "right",
      items: [
        {
          fieldElement: "input",
          inputType: "password",
          placeholder: "mot de passe",
          label: "Mot de passe",
          name: "password",
          registerOptions: {
            required: {
              value: true,
              message: "Le mot de passe est obligatoire",
            },
            pattern: {
              value: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
              message: "Le format du mot de passe n'est pas correct",
            },
          },
        },
        {
          fieldElement: "select",
          label: "Nationnalité",
          name: "nationality",
          selectOptions: [
            { content: "Française", value: "Française" },
            { content: "Anglaise", value: "Anglaise" },
          ],
        },
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
    mutationFn: (data: TUser | FieldValues) => {
      return isEditModal
        ? UserService.update(selectedUser?.id, data)
        : UserService.create(data);
    },
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({
        queryKey: ["users", selectedUser?.id],
      });
      const previousUsers = queryClient.getQueryData([
        "users",
        selectedUser?.id,
      ]);
      queryClient.setQueryData(["users", selectedUser?.id], newUser);
      return { previousUsers, newUser };
    },
    mutationKey: ["users"],
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      handleCloseModal();
    },
  });

  const handleSubmitUser: SubmitHandler<TUser | FieldValues> = (data) => {
    updateOrCreateMutation.mutate(data);
  };

  const deleteMutation = useMutation({
    mutationFn: () => {
      return UserService.delete(selectedUser?.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      handleCloseModal();
    },
  });

  const handleDeleteUser = async () => {
    deleteMutation.mutate();
    handleCloseModal();
  };

  if (isError || !users) return <div>Erreur</div>;

  if (isLoading) return <div>...</div>;

  const dataRows: Array<TUserTableData> = users?.data.map((user) => ({
    ...user,
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
        dashboardTitle="Utilisateurs"
        handleAction={setDisplayModal}
        data={dataRows}
        selectedItem={setSelectedUser}
        columns={[
          {
            key: "firstName",
            header: "Prénom",
          },
          {
            key: "lastName",
            header: "Nom",
          },
          {
            key: "birthdate",
            header: "Date de naissance",
          },
          {
            key: "email",
            header: "Mail",
          },
          {
            key: "nationality",
            header: "Nationalité",
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
        handleSubmit={handleSubmitUser}
        modalHeaderTitle={
          isOpenModal ? "Ajouter un utilisateur" : "Modifier un utilisateur"
        }
      />
      <CancelModal
        displayModal={isOpenCancelModal}
        closeModal={handleCloseModal}
        handleDeleteItem={handleDeleteUser}
      />
    </div>
  );
}
