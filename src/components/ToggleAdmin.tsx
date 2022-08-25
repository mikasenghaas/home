// ToggleAdmin.tsx
// By: Mika Senghaas

import { FiEdit } from "react-icons/fi";
import { MdDone } from "react-icons/md";

import * as md from '../styles/MarkdownStyles'

const ToggleAdmin = (props: any) => {
  const { admin } = props.state;

  const toggleAdmin = () => {
    if (!admin) {
      const p = prompt("Password");
      if (p === process.env.REACT_APP_ADMIN_PASSWORD) {
        props.setState((prev: any) => ({
          ...prev,
          admin: true,
        }));
      }
    } else {
      props.setState((prev: any) => ({
        ...prev,
        admin: false,
      }));
    }
  };

  return (
    <md.Link onClick={toggleAdmin} fontSize='12px' color='var(--markdown-text)'>{admin ? 'Save Changes' : 'Edit'}</md.Link>
  )
}

export default ToggleAdmin;
