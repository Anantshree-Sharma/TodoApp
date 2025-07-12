import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Tables({ cells, tasks }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {cells.map((cell, i) => (
              <TableCell sx={{ fontWeight: "bold" }} key={i}>
                {cell}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={index}>
              {cells.map((cell, i) => {
                const value = cell.toLowerCase();
                return <TableCell key={i}>{task[value]}</TableCell>;
              })}
              <TableCell>
                <Link to={`/home/task/${task._id}`}>
                  <PencilSquareIcon className="h-6 w-6 text-gray-500 hover:text-black" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Tables;
