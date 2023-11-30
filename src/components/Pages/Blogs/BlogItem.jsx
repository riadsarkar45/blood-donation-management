import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ImageListItem from '@mui/material/ImageListItem';
const BlogItem = ({item}) => {
    const {title, image, writerName} = item;
    return (
        <ImageListItem>
            <img
                srcSet={image}
                src={image}
                alt={title}
                loading="lazy"
            />
            <ImageListItemBar
                title={title}
                subtitle={writerName}
                actionIcon={
                    <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${title}`}
                    >
                        <InfoIcon />
                    </IconButton>
                }
            />
        </ImageListItem>
    );
};

export default BlogItem;