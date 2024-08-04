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
//     const snapshot = await getDocs(collection(firestore, 'inventory'));
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
//     const docRef = doc(collection(firestore, 'inventory'), item);
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
//     const docRef = doc(collection(firestore, 'inventory'), item);
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
//     <Box
//       width='100vw'
//       height='100vh'
//       display='flex'
//       flexDirection='column'
//       justifyContent="center"
//       alignItems='center'
//       bgcolor="#f5f5f5"
//       padding={4}
//     >
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           position="absolute"
//           top="50%"
//           left="50%"
//           width={400}
//           bgcolor="white"
//           borderRadius={4}
//           boxShadow={24}
//           p={4}
//           display="flex"
//           flexDirection="column"
//           gap={3}
//           sx={{ transform: "translate(-50%,-50%)" }}
//         >
//           <Typography variant="h6" textAlign="center" fontWeight="bold">Add New Item</Typography>
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
//               variant="contained"
//               color="primary"
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
      
//       <Box width="100%" maxWidth={800} border="1px solid #ccc" borderRadius={4} overflow="hidden" bgcolor="white" boxShadow={2}>
//         <Box
//           width="100%"
//           bgcolor="#1976d2"
//           color="white"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           padding={2}
//         >
//           <Typography variant='h4'>Inventory Items</Typography>
//         </Box>
//         <Stack width="100%" spacing={2} padding={2} maxHeight={400} overflow="auto">
//           {inventory.map(({ name, quantity }) => (
//             <Box key={name} display='flex' alignItems='center' justifyContent='space-between' bgcolor='#f9f9f9' padding={2} borderRadius={4} boxShadow={1}>
//               <Typography variant='h6'>{name}</Typography>
//               <Typography variant='h6'>{quantity}</Typography>
//               <Button variant="contained" color="secondary" onClick={() => removeItem(name)}>Remove</Button>
//             </Box>
//           ))}
//         </Stack>
        
//       </Box>
//       <Button variant="contained" color="primary" onClick={handleOpen}>
//         Add a New Item
//       </Button>
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
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredInventory = inventory.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

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
        <Box padding={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        <Stack width="100%" spacing={2} padding={2} maxHeight={400} overflow="auto">
          {filteredInventory.map(({ name, quantity }) => (
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
