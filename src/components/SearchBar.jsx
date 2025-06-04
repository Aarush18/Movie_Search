import { TextField, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function SearchBar({ search, setSearch, onClear }) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="Search Movies..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={onClear}
        startIcon={<ClearIcon />}
      >
        Clear
      </Button>
    </Stack>
  );
}
