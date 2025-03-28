import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';


const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];






export default function RandomQuote() {
  const [randomQuote, setQuote] = useState({})
  const [color, setColor] = useState("")

  const getRandomQuote = async () => {
    const res = await fetch('https://dummyjson.com/quotes/random')
    const data = await res.json()
    setQuote(data)
  }

  const getRandomColors = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)]
    setColor(newColor)
  }

  const handleClick = () => {
    getRandomQuote()
    getRandomColors()
  }

  useEffect(() => {
    getRandomQuote()
    getRandomColors()
  }, [])

  const twitterLink = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(randomQuote.quote);
  const tumblrLink = "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=" + encodeURIComponent(randomQuote.author) + "&content=" + encodeURIComponent(randomQuote.quote) + "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'white',
      color: color,
      boxShadow: theme.shadows[1],
      fontSize: 11,
      fontWeight:'300'
    },
  }));

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color,
        flexDirection: "column"
      }}
    >


      <Card sx={{
        maxWidth: 345,
        backgroundColor: 'white'
      }}>
        <CardContent>
          <Typography variant="body2" sx={{
            color: color,
            textAlign: 'center'
          }}>
            <i className="fa fa-quote-left"></i> {randomQuote.quote}

          </Typography>
          <Typography variant="caption" gutterBottom
            sx={{
              display: 'block',
              color: color,
              textAlign: 'right',
              marginTop: 3
            }}>
            - {randomQuote.author}
          </Typography>
        </CardContent>

        <CardActions disableSpacing
          sx={{ display: 'flex' }}
        >
          <LightTooltip
            title="Tweet this quote!"
            slots={{
              transition: Zoom,
            }}
          >
            <IconButton aria-label="tweet" href={twitterLink} target='_blank'>
              <i className="fa-brands fa-square-twitter" style={{ color: color }}></i>
            </IconButton>
          </LightTooltip>


          <LightTooltip
            title="Post on Tumblr"
            slots={{
              transition: Zoom,
            }}
            
          >
            <IconButton aria-label="tumblr" href={tumblrLink} target='_blank'>
              <i className="fa-brands fa-square-tumblr" style={{ color: color }}></i>
            </IconButton>
          </LightTooltip>

          <IconButton aria-label="new quote" sx={{ marginLeft: 'auto' }}>
            <AutorenewIcon
              onClick={handleClick}
              sx={{
                color: color,
              }}
            />
          </IconButton>
        </CardActions>
      </Card>

      <Typography
        variant="caption"
        component="a"
        href="https://github.com/abizekv"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: 'white',
          textAlign: 'center',
          display: 'block',
          fontWeight: 100,
          fontSize: '0.6em',
          marginTop: 1,
          textDecoration: 'none'
        }}
      >
        by abizekv
      </Typography>
    </Box>

  );
}

