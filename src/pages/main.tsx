import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo.png';

export default function main () {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/searchResult?target='+search)
    console.log("submitted");
  };

  return (
    <div>
      <Box>
        <img src={Logo}></img>
        <Typography variant="h1" sx={{marginBottom: 10, marginTop: 5, fontFamily: "Tenada"}}>케이스매치</Typography>
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
          <TextField
            value={search}
            onChange={(e) => {setSearch(e.target.value)}}
            placeholder="문장식으로 입력해주세요"
            variant="outlined"
            sx={{backgroundColor: "White", width: 800,borderRadius: 4}}
            multiline={true}
            rows={4}
            maxRows={4}  
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{backgroundColor: "#3f51b5", color: "white", width: 800, height: 50, borderRadius: 4}}
          >검색</Button>
        </form>
        </Box>
    </div>
  )
}