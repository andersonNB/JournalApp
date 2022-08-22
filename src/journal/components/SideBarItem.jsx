import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {
	Grid,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import {TurnedInNot} from "@mui/icons-material";
import {setActiveNote} from "../../store/journal";

const SideBarItem = ({title, body, id, date, imageUrls = []}) => {
	const dispatch = useDispatch();

	//Este codigo lo que hace es que si el titulo es muy largo
	//ocultaremos el reto de su contenido y su logar pondremos ...
	const newTitle = useMemo(() => {
		return title.length > 17 ? title.substring(0, 17) + "..." : title;
	}, [title]);

	//Para escoger la nota actual en la que hacemos click
	//Lo que se puede hacer es en este evento click, toma los valores de cada item
	//ya que en el momento que se da click toma los valores correspondientes, ¿como se sincroniza?
	const selectNoteActive = () => {
		dispatch(setActiveNote({id, title, body, date, imageUrls}));
	};

	return (
		<ListItem disablePadding>
			<ListItemButton onClick={selectNoteActive}>
				<h6 style={{position: "absolute", bottom: "40px", opacity: "30%"}}>
					SideBarItem
				</h6>
				<ListItemIcon>
					<TurnedInNot />
				</ListItemIcon>
				<Grid container>
					<ListItemText primary={newTitle} />
					<ListItemText secondary={body} />
				</Grid>
			</ListItemButton>
		</ListItem>
	);
};

export default SideBarItem;
