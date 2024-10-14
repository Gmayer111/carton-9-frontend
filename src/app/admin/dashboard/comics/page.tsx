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
import { TComic, TComicAuthorCategory } from "src/types/comic";
import { getComicAssociations, useComics } from "src/hooks/comic.hook";
import { ComicService } from "src/services/comic.service";

type TComicTableData = TTableGeneric<
  TComic & {
    actions: string;
  }
>;

const displayListTable = (item: string) => {
  return (
    <ul>
      <li>{item}</li>
    </ul>
  );
};

export default function Page() {
  const queryClient = useQueryClient();
  const { data: comics, isError, isLoading } = useComics();
  const { data: comicAssociations } = getComicAssociations();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState<boolean>(false);
  const [selectedComic, setSelectedComic] = useState<TComic>();
  const [displayModal, setDisplayModal] = useState("");

  const defaultValues: TComic = {
    title: selectedComic?.title || "",
    releaseDate: selectedComic?.releaseDate || Date.now(),
    description: selectedComic?.description || "",
    tome: selectedComic?.tome || 0,
    collectionId: selectedComic?.collectionId || 0,
    publisherId: selectedComic?.publisherId || 0,
    currentAuthorsId: selectedComic?.currentAuthorsId?.map((author) =>
      author.toString()
    ) || ["0"],
    currentCategoriesId: selectedComic?.currentCategoriesId?.map((category) =>
      category.toString()
    ) || ["0"],
  };

  const methods = useForm<TComic | FieldValues>({
    defaultValues: selectedComic,
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
          placeholder: "Tintin chez les ...",
          label: "Titre",
          name: "title",
        },
        {
          fieldElement: "input",
          inputType: "date",
          label: "Date de sortie",
          name: "releaseDate",
        },
        {
          fieldElement: "input",
          inputType: "number",
          placeholder: "1",
          label: "Tome",
          name: "tome",
        },
        {
          fieldElement: "textarea",
          label: "Description",
          name: "description",
        },
        {
          fieldElement: "input",
          inputType: "text",
          placeholder: "link",
          label: "Image",
          name: "picture",
        },
      ],
    },
    {
      columnSide: "right",
      items: [
        {
          fieldElement: "select",
          label: "Collection",
          name: "collectionId",
          selectOptions: comicAssociations?.data
            .filter(
              (collection) =>
                collection.comicAssociationsRecordtype === "collection"
            )
            .map((collection) => ({
              value: Number(collection?.id),
              content: collection?.comicAssociationsName as string,
            })),
        },
        {
          fieldElement: "select",
          label: "Editeurs",
          name: "publisherId",
          selectOptions: comicAssociations?.data
            .filter(
              (publisher) =>
                publisher.comicAssociationsRecordtype === "publisher"
            )
            .map((publisher) => ({
              value: Number(publisher.id),
              content: publisher.comicAssociationsName as string,
            })),
        },
        {
          fieldElement: "select",
          multiple: true,
          label: "Catégories",
          name: "currentCategoriesId",
          selectOptions: comicAssociations?.data
            .filter(
              (category) => category.comicAssociationsRecordtype === "category"
            )
            .map((category) => ({
              value: Number(category.id),
              content: category.comicAssociationsName as string,
            })),
        },
        {
          fieldElement: "select",
          multiple: true,
          label: "Auteurs",
          name: "currentAuthorsId",
          selectOptions: comicAssociations?.data
            .filter((author) => author.comicAssociationsRecordtype === "author")
            .map((author) => ({
              value: Number(author.id),
              content: author.comicAssociationsName as string,
            })),
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
    mutationFn: (data: TComic | FieldValues) => {
      let newData: TComic = {
        ...data,
        Authors: data.currentAuthorsId.map(
          (authorId: Pick<TComicAuthorCategory, "authorId">) => ({
            authorId: Number(authorId),
          })
        ),
        Categories: data.currentCategoriesId.map(
          (categoryId: Pick<TComicAuthorCategory, "categoryId">) => ({
            categoryId: Number(categoryId),
          })
        ),
      };

      delete newData.currentAuthorsId;
      delete newData.currentCategoriesId;

      return isEditModal
        ? ComicService.update(selectedComic?.id, newData)
        : ComicService.create(newData);
    },
    onMutate: async (newComic) => {
      await queryClient.cancelQueries({
        queryKey: ["comics", selectedComic?.id],
      });
      const previousComics = queryClient.getQueryData([
        "comics",
        selectedComic?.id,
      ]);
      queryClient.setQueryData(["comics", selectedComic?.id], newComic);
      return { previousComics, newComic };
    },
    mutationKey: ["comics"],
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comics"] });
      handleCloseModal();
    },
  });

  const handleSubmitComic: SubmitHandler<TComic | FieldValues> = (data) => {
    updateOrCreateMutation.mutate(data);
  };

  const deleteMutation = useMutation({
    mutationFn: () => {
      return ComicService.delete(Number(selectedComic?.id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comics"] });
      handleCloseModal();
    },
  });

  const handleDeleteComic = async () => {
    deleteMutation.mutate();
    handleCloseModal();
  };

  if (isError || !comics) return <div>Erreur</div>;

  if (isLoading) return <div>...</div>;

  const dataRows: Array<TComicTableData> = comics?.data.map((comic) => ({
    ...comic,
    Collection: comic.Collection?.name,
    Publisher: comic.Publisher?.name,
    currentAuthorsId: comic.Authors?.map((author) => author.id),
    Authors: comic?.Authors?.map((author) => displayListTable(author.userName)),
    currentCategoriesId: comic.Categories?.map((category) => category.id),
    Categories: comic?.Categories?.map((category) =>
      displayListTable(category.label)
    ),
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
        dashboardTitle="Bandes dessinées"
        handleAction={setDisplayModal}
        data={dataRows}
        selectedItem={setSelectedComic}
        columns={[
          {
            key: "title",
            header: "Titre",
          },
          {
            key: "releaseDate",
            header: "Date de sortie",
          },
          {
            key: "tome",
            header: "Tome",
          },
          {
            key: "Collection",
            header: "Collection",
          },
          {
            key: "Publisher",
            header: "Editeur",
          },
          {
            key: "Authors",
            header: "Auteur",
          },
          {
            key: "Categories",
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
        handleSubmit={handleSubmitComic}
        modalHeaderTitle={
          isOpenModal
            ? "Ajouter une bande dessinée"
            : "Modifier une bande dessinée"
        }
      />
      <CancelModal
        displayModal={isOpenCancelModal}
        closeModal={handleCloseModal}
        handleDeleteItem={handleDeleteComic}
      />
    </div>
  );
}
