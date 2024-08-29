"use client";
import React, { ReactNode } from "react";

type TableProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
  data: Array<T>;
};

export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header?: string | number | ReactNode;
};

const Table = <T, K extends keyof T>({ data, columns }: TableProps<T, K>) => {
  return (
    <section>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={`column-${index}`}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={`row-${index}`}>
                {columns.map((column, index2) => (
                  <td key={`cell-${index2}`}>{row[column.key] as ReactNode}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;
