import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import url from '../config/url.json';
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


class Case {
  id: number;
  title: string;
  score: number;
  link: string;

  constructor(id: number, title: string, score: number, link: string) {
    this.id = id;
    this.title = title;
    this.score = score;
    this.link = link;
  }
}

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import favicon from '../assets/logo.png';

const pages = ['Products', 'Pricing', 'Blog'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button onClick={() => {window.location.href = "/"} }><img src={favicon} style={{width: "30px", height: "30px", padding: 0}}></img></Button>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Tenada',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            케이스매치
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default function searchResult () {

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', width: 500,
      renderCell: (params) => (
        <Link to={"/searchResult?target="+params.value}>{params.value}</Link>
      )
    },
    { field: 'score', headerName: 'Similarity', width: 130 },
    { field: 'link', headerName: 'Link', width: 100,
      renderCell: (params) => (
        <a href={params.value.toString()}>바로가기</a>

      )
    }
  ]

  const [ searchParams ] = useSearchParams();
  const [ searchResult, setSearchResult ] = useState<Case[]>();
  const [ searchComplete, setSearchComplete ] = useState(false);
  const [ search, setSearch ] = useState(searchParams.get("target"));

  useEffect(() => {
    setSearch(searchParams.get("target"));

  }, [searchParams.get("target")]);
  

  useEffect(() => {
    if (searchResult) {
      setSearchComplete(true);
    }
  }, [searchResult])

  useEffect(() => {
    (async () => {
      var formData = new FormData();
      const target = searchParams.get("target");
      if (target) {
        formData.append("contents", target);
      }

      axios.post(
        url.baseUrl+url.uri.comapre,
        formData,
        {headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }}
      ).then((res) => {
        var i = 0;
        setSearchResult(res.data.responses[0].matches.map((c: any) => {
          i++;
          return new Case(i, c.title, c.score, c.link)
        }));
      }).catch((e) => {
        console.log(e);
      });
      
      })();

  },[searchParams]);

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult])



  return(
  <Box sx={{width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems:"center"}}>
    <ResponsiveAppBar />
    <Box sx={{bgcolor: "white", color: "black", marginTop: 10, width: "300px", border: 1, borderRadius: 8, paddingBottom: 3, paddingLeft: 3, paddingRight: 3, marginBottom: 3}}>
      <p>검색결과 :</p>
      <form style={{display: "flex"}}>
        <TextField 
          value={search}
          onChange={(e) => {setSearch(e.target.value)}}
        />
        <Button
          variant="contained"
          onClick={() => {window.location.href = "/searchResult?target="+search}}
        >재검색</Button>
      </form>
      
    </Box>

    {searchComplete ? <Box sx={{bgcolor: "white", color: "black", border: 1, borderRadius: 8, width: 1000, padding: 4}}>
      <DataGrid
        rows={searchResult?.map((item) => ({...item }))}
        columns={columns}
        getRowId={(row) => row.id}
        isRowSelectable={() => false}
        checkboxSelection />
    </Box> : <Box sx={{bgcolor: "white", color: "black"}}>Loading...</Box>}
  </Box>) 
}