import React, {FC} from "react";
import Card from '@mui/material/Card';
import styled from "styled-components";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Button, CardActions} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import {APIChatResponse} from "@/app/api/models/interview";

const FeedbackCardContainer = styled.div`
  display: grid;
  place-items: center;
`

type FeedbackCardProps = {
  feedback: APIChatResponse;
};

const FeedbackCard: FC<FeedbackCardProps> = ({feedback}) => {
  if (!feedback) {
    return <></>
  }
  return (
    <FeedbackCardContainer>
      <Card style={{maxHeight: "20rem", width: "100%", overflow: "scroll"}}>
        <CardContent>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Feedback
          </Typography>
            <Typography variant="body2">
              {feedback.message}
            </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained"><SaveIcon /></Button>
        </CardActions>
      </Card>
    </FeedbackCardContainer>
  )
}

export default FeedbackCard