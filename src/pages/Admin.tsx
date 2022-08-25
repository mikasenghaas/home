// Admin.tsx
// By: Mika Senghaas
// custom styles
import { Flex, Button } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

// custom styles
import * as md from "../styles/MarkdownStyles";

// custom components
import PageBox from "../components/PageBox";
import CourseBox from "../components/CourseBox"
import MaterialBox from "../components/MaterialBox"

// pages
import Unauthorised from '../pages/Unauthorised';

const Admin = (props: any) => {
  const navigate = useNavigate()
  const { material, admin } = props.state

  useEffect(() => {
    if (!admin) {
      const p = prompt("Password");
      if (p === 'test') {
        props.setState((prev: any) => ({
          ...prev, 
          admin: true
        }))
      }
    }
  }, []);

  if (admin) {
    return (
      <PageBox>
        <md.H1>Admin</md.H1>
        <md.Divider />
        <md.P>
          Welcome to the <md.InlineCode>Admin</md.InlineCode> page. Create, edit and remove material from here.
        </md.P>
        <Button
          variant="outline"
          w="100%"
          my=".5rem"
          _hover={{ backgroundColor: "var(--markdown-accent)" }}
          onClick={() => navigate('new-material')}
        >
          Create Course
        </Button>
        <Button
          variant="outline"
          w="100%"
          my=".5rem"
          _hover={{ backgroundColor: "var(--markdown-accent)" }}
          onClick={() => navigate('new-material')}
        >
          Create Material
        </Button>
        <md.H2>Material</md.H2>
        <md.Divider />
        {material.map((m: any, i: number) => {
          return <MaterialBox to={m.id} key={i} material={m} />;
        })}
      </PageBox>
    );
  } else {
    return (
     <Unauthorised/>
    );
  }
};

export default Admin;
