import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { getGenreFromGenreId } from "utils/helpers/getGenreFromGenreId";
import { ITicketData } from "pages/interface";

interface Props {
  data: ITicketData;
  handleDetailClick?: (id: string) => void;
  handleBuyClick?: (id: string) => void;
}

export default function CCard({
  data,
  handleDetailClick,
  handleBuyClick,
}: Props) {
  const {
    id,
    original_title,
    overview,
    poster_path,
    release_date,
    location,
    genre_ids,
    price,
    seat
  } = data;
  return (
    <Card sx={{ maxWidth: 345, minHeight: 400,  height: 450,  display: 'flex', flexDirection: "column", justifyContent: 'space-between' }}>
      <CardMedia sx={{ height: 140 }} image={poster_path.includes("picsum")? poster_path: `https://image.tmdb.org/t/p/w500/${poster_path}`} title='green iguana' />
      <CardContent>
        <Box height={150}>
          <Typography gutterBottom variant='h6' component='div' height={50}>
            {original_title}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Genre: {genre_ids.map(genre_id=>getGenreFromGenreId(genre_id)).join(', ')}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Location: {location}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Seat: {seat}
          </Typography>
        </Box>
        <Box sx={{ m: 3 }} />
        <Grid container spacing={1} alignItems='center'>
          <Grid item xs={7}>
            <Typography
              fontSize={16}
              variant='h6'
              color='text.teriary'
            >
              {release_date}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant='h4' color='success.main'>
              ${price}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          size='medium'
          onClick={() => handleBuyClick && handleBuyClick(id)}
        >
          Buy
        </Button>
        <Button
          size='medium'
          onClick={() => handleDetailClick && handleDetailClick(id)}
        >
          Show More
        </Button>
      </CardActions>
    </Card>
  );
}
