import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';

// eslint-disable-next-line import/prefer-default-export
export const mainListItems = (
  <div>
    <Link href="/Dashboard" passHref>
      <ListItem button>
        <ListItemText primary="Visão Geral" />
      </ListItem>
    </Link>
  </div>
);
