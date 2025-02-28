import { getRollsToShow } from "../domain/roll";
import { PrismaClient } from "@prisma/client";
import {
    Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import Link from "next/link";

export default async function RollPage() {
  const prisma = new PrismaClient();
  const rollsToShow = await getRollsToShow(prisma);

  return (
    <DashboardLayout>
      <TableContainer sx={{maxHeight: "calc(100vh - 64px)"}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold'}}></TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Roll No</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Inspected By</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Start Time</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Customer Name</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Conclusion</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Machine Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rollsToShow.map((roll) => (
              <TableRow key={roll.id} hover>
                                <TableCell>
                  <Button variant="contained">Select</Button>
                </TableCell>
                <TableCell>{roll.rollNo}</TableCell>
                <TableCell>{roll.inspectedBy1}</TableCell>
                <TableCell>{roll.startTime.toLocaleString()}</TableCell>
                <TableCell>{roll.customerName}</TableCell>
                <TableCell>{roll.conclusionName}</TableCell>
                <TableCell>{roll.machineName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardLayout>
  );
}
