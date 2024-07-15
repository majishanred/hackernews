import {Box, Stack} from "@mui/material";
import {Link} from 'react-router-dom'

type NewsListElementProps = {
    newsId: number;
};

const NewsListElement = ({ newsId }: NewsListElementProps) => {
    return (
        <Stack gap='8px'>
            <Link to={`/${newsId}`}>{data.title}</Link>
            <Box display="flex" gap='16px'>
                <span>By: {data.by}</span>
                <span>Score: {data.score}</span>
                <span>Published: {data.time}</span>
            </Box>
        </Stack>
    )
}