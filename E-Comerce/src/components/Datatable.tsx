import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface DataTableProps<T extends GridValidRowModel> {
  columns: GridColDef<T>[];
  rows: T[];
  getRowId?: (row: T) => number;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

const paginationModel = { page: 0, pageSize: 5 };

function DataTable<T extends GridValidRowModel>({
  columns,
  rows,
  getRowId,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const actionColumn: GridColDef<T> = {
    field: "actions",
    headerName: "Ações",
    width: 180,
    renderCell: (params) => (
      <Box sx={{ display: "flex", gap: 1, paddingTop: "0.5rem" }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => onEdit?.(params.row)}
          sx={{ backgroundColor: "#b9844e", borderRadius: "1rem" }}
        >
          <EditIcon />
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{ borderRadius: "1rem" }}
          onClick={() => onDelete?.(params.row)}
        >
          <DeleteIcon />
        </Button>
      </Box>
    ),
  };

  return (
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflow: "hidden",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          rows={rows}
          columns={[...columns, actionColumn]}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          getRowId={getRowId}
          sx={{ border: 0 }}
        />
      </Box>
    </Paper>
  );
}

export default DataTable;
