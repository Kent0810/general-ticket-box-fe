import Grid from '@mui/material/Grid';
import CCard from 'components/CCard';

interface Props {
  ticketListData: any[];
  handleDetailClick?: (id: string) => void;
  handleBuyClick?: (id: string) => Promise<void>;
}

const CCardList = ({ ticketListData, handleBuyClick, handleDetailClick }: Props) => {
  return (
    <div>
      <Grid container spacing={2} columns={12}>
        {ticketListData.map((ticket) => {
          return (
            <Grid item xs={3}>
              <CCard
                data={ticket}
                handleBuyClick={handleBuyClick}
                handleDetailClick={handleDetailClick}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default CCardList;
