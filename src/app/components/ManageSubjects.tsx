"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

type Props = {
  type: string;
  initialData: string[];
  title: string;
};
export default function ManageSubjects({ type, initialData, title }: Props) {
  const [data, setData] = useState<string[]>(initialData);
  const [value, setValue] = useState<string>("");

  const hostUrl = process.env.NEXT_PUBLIC_HOST;

  const handleAddSubject = async () => {
    if (value.trim()) {
      const url = `${hostUrl}/api/subject/${type}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: value }),
      });

      if (response.ok) {
        setData([...data, value]);
        setValue("");
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {title} List
      </Typography>
      <List>
        {data.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={user} />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Enter Name"
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddSubject}>
        Add {title}
      </Button>
    </Container>
  );
}
