"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { RollEntry } from "../domain/roll";
import { Customer, InspectedType, Machine, Conclusion, User } from "@prisma/client";

export default function NewRoll() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inspectedTypes, setInspectedTypes] = useState<InspectedType[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [conclusions, setConclusions] = useState<Conclusion[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<RollEntry>({
    siNo: "",
    inspectedBy1: "",
    inspectedBy2: "",
    inspectedTypeId: "",
    inspectedQnty: 0,
    rollNo: "",
    inspectionMachineId: "",
    shift: "",
    skipNo: "",
    prdn: "",
    startTime: new Date(),
    endTime: new Date(),
    packedBy1: "",
    packedBy2: "",
    note: "",
    customerId: "",
    conclusionId: "",
    remarks: "",
  });

  useEffect(() => {
    async function fetchData() {
      const hostUrl = process.env.NEXT_PUBLIC_HOST!;
      const response = await fetch(hostUrl + "/api/rolls");
      const data = await response.json();
      setCustomers(data.customers);
      setInspectedTypes(data.inspectedTypes);
      setMachines(data.machines);
      setConclusions(data.conclusions);
      setUsers(data.users);
    }
    fetchData();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    console.log(type);
    let newValue: string | number = value;
    if (type === "number") {
      newValue = parseFloat(value);
    } else if (type === "datetime-local") {
      newValue = new Date(value).toISOString();
    }
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    const response = await fetch("/api/rolls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("New roll created successfully!");
    } else {
      alert("Failed to create new roll.");
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Typography variant="h4">New Roll Entry</Typography>
        <Card>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: "primary.light" }}>
                  Basic Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      label="SI No"
                      name="siNo"
                      value={formData.siNo}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      label="Roll No"
                      name="rollNo"
                      value={formData.rollNo}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Select
                      label="Customer"
                      name="customerId"
                      value={formData.customerId}
                      onChange={handleSelectChange}
                      fullWidth
                      required
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select Customer</em>
                      </MenuItem>
                      {customers.map((customer) => (
                        <MenuItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>

              {/* Inspection Details */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: "primary.light" }}>
                  Inspection Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Select
                      label="Inspected By 1"
                      name="inspectedBy1"
                      value={formData.inspectedBy1}
                      onChange={handleSelectChange}
                      fullWidth
                      required
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select Inspector 1</em>
                      </MenuItem>
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Select
                      label="Inspected By 2"
                      name="inspectedBy2"
                      value={formData.inspectedBy2}
                      onChange={handleSelectChange}
                      fullWidth
                      required
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select Inspector 2</em>
                      </MenuItem>
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Select
                      label="Inspected Type"
                      name="inspectedTypeId"
                      value={formData.inspectedTypeId}
                      onChange={handleSelectChange}
                      fullWidth
                      required
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select Type</em>
                      </MenuItem>
                      {inspectedTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.inspectedType}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>

              {/* Production Details */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: "primary.light" }}>
                  Production Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      label="Inspected Quantity"
                      name="inspectedQnty"
                      type="number"
                      value={formData.inspectedQnty}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Select
                      label="Machine"
                      name="inspectionMachineId"
                      value={formData.inspectionMachineId}
                      onChange={handleSelectChange}
                      fullWidth
                      required
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select Machine</em>
                      </MenuItem>
                      {machines.map((machine) => (
                        <MenuItem key={machine.id} value={machine.id}>
                          {machine.machine}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      label="Shift"
                      name="shift"
                      value={formData.shift}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      label="PRDN"
                      name="prdn"
                      value={formData.prdn}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Time Details */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: "primary.light" }}>
                  Time Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Start Time"
                      name="startTime"
                      type="datetime-local"
                      value={formData.startTime}
                      onChange={handleChange}
                      fullWidth
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="End Time"
                      name="endTime"
                      type="datetime-local"
                      value={formData.endTime}
                      onChange={handleChange}
                      fullWidth
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Packing Details */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: "primary.light" }}>
                  Packing Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Select
                      label="Packed By 1"
                      name="packedBy1"
                      value={formData.packedBy1}
                      onChange={handleSelectChange}
                      fullWidth
                      required
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select Packer 1</em>
                      </MenuItem>
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Select
                      label="Packed By 2"
                      name="packedBy2"
                      value={formData.packedBy2}
                      onChange={handleSelectChange}
                      fullWidth
                      required
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select Packer 2</em>
                      </MenuItem>
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>

              {/* Additional Details */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: "primary.light" }}>
                  Additional Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Skip No"
                      name="skipNo"
                      value={formData.skipNo}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Select
                      label="Conclusion"
                      name="conclusionId"
                      value={formData.conclusionId}
                      onChange={handleSelectChange}
                      fullWidth
                      required
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select Conclusion</em>
                      </MenuItem>
                      {conclusions.map((conclusion) => (
                        <MenuItem key={conclusion.id} value={conclusion.id}>
                          {conclusion.conclusion}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Note"
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={3}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Remarks"
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Save Roll Entry
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </DashboardLayout>
  );
}
