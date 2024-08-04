// 'use client'
// import Image from "next/image";
// import {useState, useEffect} from 'react';
// import {firestore} from '@/firebase';
// import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
// import { collection, deleteDoc, doc, getDoc, setDoc ,getDocs, query } from "firebase/firestore";

// // import { useEffect, useState } from 'react';
// // import { collection, getDocs, query } from 'firebase/firestore';
// // import { firestore } from './firebaseConfig'

// export default function Home() {


//   const [inventory, setInventory] = useState([])
//   const [open,setOpen] = useState(false)
//   const [itemName,setItemName] = useState('')

// const updateInventory = async() =>{
//   // const snapshot = query(collection(firestore,'inventory'))
//   const snapshot = collection(firestore, 'inventory ');
//   const docs = await getDocs(snapshot)
//   const inventoryList =[]
//   docs.forEach((doc)=>{
//     // console.log('hello')
//     inventoryList.push({
//       name: doc.id,
//       ...doc.data(),
//     })
//   })
//   setInventory(inventoryList)
//   console.log(inventoryList)
//   // console.log(inventoryList)

// }

// const addItem = async (item)=>{
//   const docRef = doc(collection(firestore,'inventory '), item)
//   const docSnap = await getDoc(docRef)

//   if(docSnap.exists()){
//     const {quantity} = docSnap.data()
//     await setDoc(docRef, {quantity: quantity+1})
//   }
//   else{
//     await setDoc(docRef, {quantity: 1})
//   }

//   await updateInventory()
// }


//   const removeItem = async (item)=>{
//     const docRef = doc(collection(firestore,'inventory '), item)
//     const docSnap = await getDoc(docRef)

//     if(docSnap.exists()){
//       const {quantity} = docSnap.data()
//       if (quantity === 1){
//         await deleteDoc(docRef)
//       }
//       else{
//         await setDoc(docRef, {quantity: quantity-1})
//       }
//     }

//     await updateInventory()
//   }

//   useEffect(() => {
//   updateInventory()
//   },[])

// const handleOpen = () => setOpen(true)
// const handleClose = () => setOpen(false)

// return ( 
//     <Box width='100vw' height='100vh' display='flex' flexDirection='column' justifyContent="center" alignItems='center' gap={2} >
//      <Modal open={open} onClose={handleClose}>
//       <Box
//       position="absolute"
//       top="50%"
//       left = "50%"
//       width={400}
//       bgcolor= "white"
//       border = "2px solid #00"
//       boxShadow={24}
//       p={4}
//       display="flex"
//       flexDirection="column"
//       gap={3}
//       sx={{
//         transform: "translate(-50%,-50%)"
//       }}
//       >

//         <Typography variant="h6">add item</Typography>
//         <Stack width='100%' flexDirection='row' >
//           <TextField
//           variant="outlined"
//           fullWidth
//           value={itemName}
//           onChange={(e)=>{
//             setItemName(e.target.value)
//           }}
//           />
// {/* </TextField> */}
//           <Button variant="outlined" onClick={()=>{
//             addItem(itemName)
//             setItemName('')
//             handleClose()
//           }} >Add</Button>
//         </Stack>
//       </Box>
//       </Modal> 
//       <Button variant="contained"
//       onClick={()=>{
//         handleOpen()
//       }}
//       >
//         Add new Item
//       </Button>
//       <Box border="1px solid #333">
//         <Box
//         width = "800px"
//         height = "100px"
//         bgcolor="#ADD8E6"
//         display = "flex"
//         alignItems ='center'
//         justifyContent= 'center'
//         >
//         <Typography variant='h2' color='#333'>Inventory items</Typography>
//         </Box>
      
//       <Stack width = "300px" height="300px" spacing={2} overflow="auto">
//         {inventory.map(({name,quantity})=>(
//           <Box key={name} width='100%' minHeight='150px' display='flex' alignItems='center' justifyContent='space-between' bgcolor='#f0f0f0' padding={5}>
//             <Typography variant='h3' color='#333' textAlign="center">{name}</Typography>
//             <Typography variant='h3' color='#333' textAlign="center">{quantity}</Typography>
//             <Button variant="contained" onClick={()=>{
//               removeItem(name)
//             }}>remove</Button>
//           </Box>
//         ))}
//       </Stack>
//       </Box>
//     </Box>
//   );
// }



// 'use client'
// import { useState, useEffect } from 'react';
// import { firestore } from '@/firebase';
// import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
// import { collection, deleteDoc, doc, getDoc, setDoc, getDocs } from "firebase/firestore";

// export default function Home() {
//   const [inventory, setInventory] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [itemName, setItemName] = useState('');
//   const [itemQuantity, setItemQuantity] = useState(1);

//   const updateInventory = async () => {
//     const snapshot = await getDocs(collection(firestore, 'inventory '));
//     const inventoryList = [];
//     snapshot.forEach((doc) => {
//       inventoryList.push({
//         name: doc.id,
//         ...doc.data(),
//       });
//     });
//     setInventory(inventoryList);
//   };

//   const addItem = async (item, quantity) => {
//     const docRef = doc(collection(firestore, 'inventory '), item);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       const { quantity: currentQuantity } = docSnap.data();
//       await setDoc(docRef, { quantity: currentQuantity + quantity });
//     } else {
//       await setDoc(docRef, { quantity: quantity });
//     }

//     await updateInventory();
//   };

//   const removeItem = async (item) => {
//     const docRef = doc(collection(firestore, 'inventory '), item);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       const { quantity } = docSnap.data();
//       if (quantity === 1) {
//         await deleteDoc(docRef);
//       } else {
//         await setDoc(docRef, { quantity: quantity - 1 });
//       }
//     }

//     await updateInventory();
//   };

//   useEffect(() => {
//     updateInventory();
//   }, []);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <Box width='100vw' height='100vh' display='flex' flexDirection='column' justifyContent="center" alignItems='center' gap={2}>
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           position="absolute"
//           top="50%"
//           left="50%"
//           width={400}
//           bgcolor="white"
//           border="2px solid #00"
//           boxShadow={24}
//           p={4}
//           display="flex"
//           flexDirection="column"
//           gap={3}
//           sx={{ transform: "translate(-50%,-50%)" }}
//         >
//           <Typography variant="h6">Add Item</Typography>
//           <Stack width='100%' flexDirection='row' gap={2}>
//             <TextField
//               variant="outlined"
//               fullWidth
//               value={itemName}
//               onChange={(e) => setItemName(e.target.value)}
//               placeholder="Item Name"
//             />
//             <TextField
//               variant="outlined"
//               type="number"
//               value={itemQuantity}
//               onChange={(e) => setItemQuantity(Number(e.target.value))}
//               placeholder="Quantity"
//             />
//             <Button
//               variant="outlined"
//               onClick={() => {
//                 addItem(itemName, itemQuantity);
//                 setItemName('');
//                 setItemQuantity(1);
//                 handleClose();
//               }}
//             >
//               Add
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>
//       <Button variant="contained" onClick={handleOpen}>
//         Add New Item
//       </Button>
//       <Box border="1px solid #333">
//         <Box width="800px" height="100px" bgcolor="#ADD8E6" display="flex" alignItems="center" justifyContent="center">
//           <Typography variant='h2' color='#333'>Inventory Items</Typography>
//         </Box>
//         <Stack width="300px" height="300px" spacing={2} overflow="auto">
//           {inventory.map(({ name, quantity }) => (
//             <Box key={name} width='100%' minHeight='150px' display='flex' alignItems='center' justifyContent='space-between' bgcolor='#f0f0f0' padding={5}>
//               <Typography variant='h3' color='#333' textAlign="center">{name}</Typography>
//               <Typography variant='h3' color='#333' textAlign="center">{quantity}</Typography>
//               <Button variant="contained" onClick={() => removeItem(name)}>Remove</Button>
//             </Box>
//           ))}
//         </Stack>
//       </Box>
//     </Box>
//   );
// }
'use client'
import { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, deleteDoc, doc, getDoc, setDoc, getDocs } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);

  const updateInventory = async () => {
    const snapshot = await getDocs(collection(firestore, 'inventory'));
    const inventoryList = [];
    snapshot.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item, quantity) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity: currentQuantity } = docSnap.data();
      await setDoc(docRef, { quantity: currentQuantity + quantity });
    } else {
      await setDoc(docRef, { quantity: quantity });
    }

    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width='100vw'
      height='100vh'
      display='flex'
      flexDirection='column'
      justifyContent="center"
      alignItems='center'
      bgcolor="#f5f5f5"
      padding={4}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          borderRadius={4}
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{ transform: "translate(-50%,-50%)" }}
        >
          <Typography variant="h6" textAlign="center" fontWeight="bold">Add New Item</Typography>
          <Stack width='100%' flexDirection='row' gap={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Item Name"
            />
            <TextField
              variant="outlined"
              type="number"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(Number(e.target.value))}
              placeholder="Quantity"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addItem(itemName, itemQuantity);
                setItemName('');
                setItemQuantity(1);
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      
      <Box width="100%" maxWidth={800} border="1px solid #ccc" borderRadius={4} overflow="hidden" bgcolor="white" boxShadow={2}>
        <Box
          width="100%"
          bgcolor="#1976d2"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding={2}
        >
          <Typography variant='h4'>Inventory Items</Typography>
        </Box>
        <Stack width="100%" spacing={2} padding={2} maxHeight={400} overflow="auto">
          {inventory.map(({ name, quantity }) => (
            <Box key={name} display='flex' alignItems='center' justifyContent='space-between' bgcolor='#f9f9f9' padding={2} borderRadius={4} boxShadow={1}>
              <Typography variant='h6'>{name}</Typography>
              <Typography variant='h6'>{quantity}</Typography>
              <Button variant="contained" color="secondary" onClick={() => removeItem(name)}>Remove</Button>
            </Box>
          ))}
        </Stack>
        
      </Box>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add a New Item
      </Button>
    </Box>
  );
}
