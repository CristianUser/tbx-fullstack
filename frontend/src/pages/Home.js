import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Layout from '../components/Layout';


const Home = () => {
  const [filesData, setFilesData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    setError(null);
    
    fetch('http://localhost:3000/files/data', {
      signal: abortController.signal
    })
      .then((res) => res.json())
      .then((data) => setFilesData(data))
      .catch((err) => setError(err))
      .finally(() => {
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  if (loading) {
    return (
      <Layout>
        <Spinner animation="border" />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Alert variant="danger">{error.message}</Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {filesData.flatMap(file => file.lines.map((line, index) => (
            <tr key={`${file.file}-${index}`}>
              <td>{file.file}</td>
              <td>{line.text}</td>
              <td>{line.number}</td>
              <td>{line.hex}</td>
            </tr>
          )))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default Home;
