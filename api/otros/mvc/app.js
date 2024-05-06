const express = require('express');
const app = express();
const cors = require('cors')
const notesRoutes = require('./routes/notesRoutes');

app.use(express.json());
app.use(cors())
 
app.use('/notes', notesRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found'
  })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});