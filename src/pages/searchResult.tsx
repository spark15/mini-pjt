import { useSearchParams } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { lazy } from "react";
import url from '../config/url.json';

import axios from "axios";
import { Box } from "@mui/material";
export default function searchResult () {
  class Case {
    id: number;
    title: string;
    caseNumber: string;
    content: string;
    link: string;


    constructor(id:number, title: string, caseNumber: string, content: string, link: string) {
      this.id = id;
      this.title = title;
      this.caseNumber = caseNumber;
      this.content = content;
      this.link = link;
    }

  }
  class SearchResult extends Case{
    sim: number;

    constructor(id: number, title: string, caseNumber: string, content: string, sim: number, link: string) {
      super(id, title, caseNumber, content, link);
      this.sim = sim;
    }
    
  }

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'caseNumber', headerName: 'Case Number', width: 150 },
    { field: 'content', headerName: 'Content', width: 150 },
    { field: 'sim', headerName: 'Similarity', width: 150 },
    { field: 'link', headerName: 'Link', width: 150 },
  ]

  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ searchTarget, setSearchTarget ] = useState<Case>();
  const [ searchResult, setSearchResult ] = useState<SearchResult[]>([]);

  useEffect(() => {
    (async () => {
      axios.get(url.baseUrl+url.uri.getCase, {params: { caseNumber: searchParams.get("target")}}
      ).then((res) => {
        console.log(res.data);
      }).catch((e) => {
        console.log(e);
        setSearchTarget(
          new Case(
            1,
            "일제 강제동원 피해자들이 일본 기업을 상대로 불법행위로 인한 위자료 지급을 구하는 사건",
            "2017다카 12345",
            "일제 강제동원 피해자들이 일본 기업을 상대로 불법행위로 인한 위자료 지급을 구하는 사건",
            "https://open.law.go.kr/LSO/openApi/guideResult.do?htmlName=precListGuide"
          ));
      });
      
      axios.get(url.baseUrl+url.uri.getSearchResult, {
        params: { search: searchParams.get("target") }
      }).then((res) => {
        console.log(res.data);
        setSearchResult(res.data);
      }).catch((e) => {
        console.log(e);
        setSearchResult([
          {
            "id": 1,
            "title": "일제 강제동원 피해자들이 일본 기업을 상대로 불법행위로 인한 위자료 지급을 구하는 사건",
            "caseNumber": "2017다카 12345",
            "content": "일제 강제동원 피해자들이 일본 기업을 상대로 불법행위로 인한 위자료 지급을 구하는 사건",
            "sim": 0.9,
            "link": "https://open.law.go.kr/LSO/openApi/guideResult.do?htmlName=precListGuide"
          },

        ]);
    })})();

  },[searchParams]);


  return(
  <>
    <Box sx={{bgcolor: "white", color: "black"}}>
      <h1>{searchTarget?.title}</h1>
      <h2>{searchTarget?.caseNumber}</h2>
      <p>{searchTarget?.content}</p>
    </Box>

    {searchResult.map((result) => {
      return (
        <Box sx={{bgcolor: "white", color: "black"}}>
          <DataGrid
            rows={[result]}
            columns={columns}

            checkboxSelection />

          </Box>
      )
    })}
  </>) 
}