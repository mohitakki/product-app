import React, {useEffect, useId} from 'react';
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
import {useNavigate} from 'react-router-dom';
import {updateProduct} from '../redux/features/productSlice';

const EditProduct = () => {
  const products = JSON.parse(localStorage.getItem('products'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = React.useState('');

  const url = window.location.href;
  const prodId = url.split('/').pop();

  const prodData = products?.filter(item => item.id === prodId);

  useEffect(() => {
    if (prodData.length > 0) {
      setPreview(prodData[0].image);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: prodData[0]?.name || '',
      price: prodData[0]?.price || '',
      description: prodData[0]?.description || '',
      category: prodData[0]?.category || '',
    },
  });

  const onSubmit = data => {
    const {name, price, description, image, category} = data;
    const product = {
      id: prodId,
      name,
      price,
      description,
      image: preview,
      category,
    };
    dispatch(updateProduct(product));
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
  };

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
        <Box p={4}>
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
              <Button size="xs" colorScheme="red" onClick={handleRemoveImage}>
                Remove Image
              </Button>
            </Box>
          )}

          <FormControl isRequired mt={4}>
            <FormLabel>Product Image</FormLabel>
            <Input
              type="file"
              id="file"
              pt={1}
              {...register('image')}
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

export default EditProduct;
