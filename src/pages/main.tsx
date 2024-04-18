import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function main () {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/searchResult?target=' +search)
    console.log("submitted");
  };



  return (
    <div>
      <Box>
        <Typography variant="h1" sx={{marginBottom: 25}}>유사 판례 검색 시스템</Typography>
        <form onSubmit={handleSubmit}>
          <TextField value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder="Search..." variant="outlined" sx={{backgroundColor: "White"}} />
          <Button type="submit" variant="contained">검색</Button>
        </form>
        </Box>
    </div>
  )
}