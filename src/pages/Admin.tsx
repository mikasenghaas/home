// Admin.tsx
// By: Mika Senghaas
// custom styles
import { useState, useEffect } from "react";
import * as md from "../styles/MarkdownStyles";

// custom components
import PageBox from "../components/PageBox";

const Admin = () => {
  const [pw, setPw] = useState<string>("test");

  /*
  useEffect(() => {
    const p = prompt("Password");
    setPw(p!);
  }, []);
  */

  if (pw === "test") {
    return (
      <PageBox>
        <md.H1>Admin</md.H1>
        <md.Divider />
        <md.P>
          Welcome to the <md.InlineCode>Admin</md.InlineCode> page. Create, edit and remove material from here.
        </md.P>
        <md.Divider />
        <md.P>
          Go back to the<md.Link> HomePage</md.Link>
        </md.P>
      </PageBox>
    );
  } else {
    return (
      <PageBox>
        <md.H1>Unauthorised</md.H1>
        <md.Divider />
      </PageBox>
    );
  }
};

export default Admin;
