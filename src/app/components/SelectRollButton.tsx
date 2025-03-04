"use client";

import { useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";

export default function SelectRollButton({ rollId }: { rollId: string }) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectRoll = async () => {
    setLoading(true);
    const response = await fetch("/api/rolls/current", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentRollId: rollId }),
    });

    if (response.ok) {
      setSuccessMessage("Roll selected successfully!");
    } else {
      setSuccessMessage("Failed to select roll.");
    }
    setLoading(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleSelectRoll} disabled={loading}>
        {loading ? "Selecting..." : "Select"}
      </Button>

      <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(null)}>
        <Alert onClose={() => setSuccessMessage(null)} severity={successMessage === "Roll selected successfully!" ? "success" : "error"}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
}