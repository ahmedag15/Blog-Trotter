import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' };

const BlogDetail = () => {
  const navigate = useNavigate();
  const  id  = useParams().id;
  console.log(id);
  useEffect(() => { })

  const [blog, setBlog] = useState();


  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };


  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`)
      .catch(err => console.log(err));

    const data = await res.data;
    return data;
  }

  useEffect(() => {
    fetchDetails().then(data => {
      setBlog(data.blog)
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        imageURL: data.blog.image,
      });
    })
  }, [id]);
  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`, {
      title: inputs.title,
      description: inputs.description

    }).catch(err => console.log(err));

    const data = await res.data;
    return data
  }
  console.log(blog);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs);
    sendRequest().then(data => console.log(data)).then(() => navigate('/myBlogs/'));
  }

  return (
    <div>
      {inputs &&
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor='linear-gradient(90deg, rgba(2,0,36,1) 2%, rgba(0,58,161,1) 36%, rgba(0,212,255,1) 100%)'
            borderRadius={10} boxShadow='10px 10px 20px #ccc' padding={3} margin={'auto'} marginTop={3} display='flex' flexDirection={'column'} width={'80%'}>
            <Typography fontWeight={'bold'} padding={3} color='black' variant='h2' textAlign={'center'} >Edit your blog</Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField name='title' value={inputs.title} onChange={handleChange} margin='normal' variant='outlined' />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField name='description' value={inputs.description} onChange={handleChange} margin='normal' variant='outlined' />
            <Button type='submit' variant='contained' sx={{ borderRadius: 4, marginTop: 2 }} color='warning'>Submit</Button>
          </Box>
        </form>
      }
    </div>
  )
}

export default BlogDetail