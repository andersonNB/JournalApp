import {Box, Toolbar} from "@mui/material";
import {NavBar, SideBar} from "../components/";

const drawerWidth = 240; //-> esto seria nuestra barra lateral
//Los Layout en este caso, esperan un children
const JournalLayout = ({children}) => {
	return (
		<Box sx={{display: "flex", backgroundColor: "#FFF9CA"}}>
			JournalLayout
			{/* Navbar drawerWidth */}
			<NavBar drawerWidth={drawerWidth} />
			{/* Sidebar  drawerWidth*/}
			<SideBar drawerWidth={drawerWidth} />
			<Box component="main" sx={{flexGrow: 1, p: 3}}>
				{/* Toolbar */}
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
};

export default JournalLayout;
