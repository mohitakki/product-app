import React, {useId} from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {addProduct} from '../redux/features/productSlice';
import {useNavigate} from 'react-router-dom';
import uuid from 'react-uuid'



const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = React.useState('');
  const id = useId();



  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();



  const onSubmit = data => {
    const {name, price, description, image, category, rating} = data;
    const product = {
      id: uuid(),
      name,
      price,
      description,
      image: preview,
      category,
      rating,
      addedToWishlist: false,
      quatity: 0,
    };
    dispatch(addProduct(product));
    navigate('/');
  };

  const handleChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreview('');
     const fileInput = document.getElementById('file');
     fileInput.value = '';
  }

  return (
    <Wrapper>
      <Box
        w={['95%', '60%', '40%']}
        bg="white"
        h="auto"
        rounded="lg"
        shadow="lg"
        my={8}
        mx="auto">
        <Box p={4} >
          <FormControl isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input type="text" {...register('name', {required: true})} />
            {errors.name && (
              <Text color="red" mt={1}>
                Product name is required
              </Text>
            )}
          </FormControl>
          {preview && (
            <Box position="relative" w={100}>
              <Image
                src={preview}
                rounded="lg"
                w={100}
                h={100}
                my={4}
                objectFit="cover"
              />
              <Button
                size="xs"
                colorScheme="red"
                onClick={handleRemoveImage}>
                Remove Image
              </Button>
            </Box>
          )}

          <FormControl isRequired mt={4}>
            <FormLabel>Product Image</FormLabel>
            <Input
              type="file"
              id='file'
              pt={1}
              {...register('image', {required: true})}
              onChange={handleChange}
            />
            {errors.image && (
              <Text color="red" mt={1}>
                Image is required
              </Text>
            )}
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              type="text"
              minH={120}
              {...register('description', {required: true})}
            />
            {errors.description && (
              <Text color="red" mt={1}>
                Description is required
              </Text>
            )}
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormLabel>Price</FormLabel>
            <Input type="number" {...register('price', {required: true})} />
            {errors.price && (
              <Text color="red" mt={1}>
                Price is required
              </Text>
            )}
          </FormControl>

          <Select
            mt={4}
            placeholder="Select Category"
            {...register('category', {required: true})}>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Electronic">Electronic</option>
          </Select>
          {errors.category && (
            <Text color="red" mt={1}>
              Category is required
            </Text>
          )}
              <Select
            mt={4}
            placeholder="Rating"
            {...register('rating', {required: true})}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
          {errors.rating && (
            <Text color="red" mt={1}>
              Rating is required
            </Text>
          )}
          <Button
            my={4}
            w="full"
            colorScheme="messenger"
            onClick={handleSubmit(onSubmit)}>
            Add
          </Button>
        </Box>
     </Box>
    </Wrapper>
  );
};

export default AddProduct;
