import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import CButton from "components/CButton";
import { ITicketData } from "pages/interface";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TypeSpecimenIcon from "@mui/icons-material/TypeSpecimen";

interface Props {
  data: ITicketData;
  open: boolean;
  handleClose: () => void;
  handleContinue: (id: string) => Promise<void>;
}

const TicketDetail = (props: Props) => {
  const { data, handleClose, handleContinue, open } = props;
  const {
    id,
    original_title,
    overview,
    backdrop_path,
    poster_path,
    release_date,
    location,
    genre_ids,
    price,
    seat,
    rating
  } = data;

  const ticketData = [
    { label: "Experiation Date", value: release_date },
    { label: "Amount", value: price },
    { label: "Location", value: location },
    { label: "Seat", value: seat },
    { label: "Status", value: "OK" },
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth='xl'
      className='ticket-dialog'
    >
      <DialogTitle className='ticket-dialog-title' id='alert-dialog-title'>
        <div className='ticket-overview'>
          <div className='ticket-date'>{original_title}</div>
          <div className='ticket-extra'>
            <TypeSpecimenIcon />
            Genre: {genre_ids}
          </div>
        </div>
        <IconButton
          className='dialog-title__close p-0'
          disableRipple
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className='ticket-dialog-content'>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={8}>
            <Box
              component='img'
              alt='image relating to voucher'
              src={poster_path.includes("picsum")? poster_path: `https://image.tmdb.org/t/p/w500/${backdrop_path}`}
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "250px",
                borderRadius: "3%",
              }}
            ></Box>
          </Grid>
          <Grid item xs={4}>
            <div className='ticket-detail'>
              <div className='d-flex flex-column gap-4 my-4'>
                {ticketData.map((data) => (
                  <div key={data.label} className='ticket-detail__info'>
                    <span className='info-label'>{data.label}:</span>
                    <span className='info-value'>{data.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={8}>
            <Rating name='read-only' value={rating} readOnly sx={{ m: 2 }} />
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ textAlign: "justify" }}
            >
              <span style={{fontWeight: "bold"}}>Description: </span>
              {overview}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={6}>
                <Typography
                  fontSize={16}
                  variant='h6'
                  color='text.disabled'
                  alignSelf='center'
                >
                  ${release_date}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant='h6'
                  color='success.main'
                  alignSelf='center'
                >
                  ${price}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='ticket-dialog-actions'>
        <CButton
          className='d-flex align-items-center gap-1'
          onClick={() => handleContinue(id)}
          sx={{ paddingX: "14px !important" }}
        >
          Continue <ChevronRightIcon />
        </CButton>
      </DialogActions>
    </Dialog>
  );
};

export default TicketDetail;
