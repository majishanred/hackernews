import {Box, Stack} from "@mui/material";
import {Link} from 'react-router-dom'
import {useSuspenseQuery} from "@tanstack/react-query";
import {memo} from "react";

type NewsListElementProps = {
    newsId: number;
};

const NewsFeed = memo(({ newsId }: NewsListElementProps) => {
    const { data } = useSuspenseQuery({
        queryKey: ['news', newsId],
        queryFn: ({ queryKey }) => fetch(`https://hacker-news.firebaseio.com/v0/item/${queryKey[1]}.json?print=pretty`).then(response => response.json())
    });
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
});

export default NewsFeed;