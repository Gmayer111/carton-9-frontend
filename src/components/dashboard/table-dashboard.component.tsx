"use client";
import React from "react";
import ButtonForm from "src/components/common/form/form-fields/button/button-form.component";
import TableHeader from "src/components/common/table/table-header.component";
import TableRoot from "src/components/common/table/table-root.component";
import Table, {
  TTableProps,
} from "src/components/common/table/table.component";

export type TTableDashboardProps = {
  dashboardTitle?: string;
  selectedItem: (value: any) => void;
  handleAction: (value: string) => void;
};

const TableDashboard = <T, K extends keyof T>({
  data,
  columns,
  dashboardTitle,
  selectedItem,
  handleAction,
}: TTableProps<T, K> & TTableDashboardProps) => {
  return (
    <div className="dashboard-container">
      <h1>{dashboardTitle}</h1>
      <TableRoot>
        <TableHeader>
          <ButtonForm type="button" onClick={() => handleAction("openModal")}>
            Ajouter
          </ButtonForm>
        </TableHeader>
        <Table
          selectedItem={selectedItem}
          columns={columns}
          data={data}
          handleAction={handleAction}
        />
      </TableRoot>
    </div>
  );
};

export default TableDashboard;
