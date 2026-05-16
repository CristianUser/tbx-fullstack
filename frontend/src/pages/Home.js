import React from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Layout from '../components/Layout';


const Home = () => {
  const [filesData, setFilesData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [fileNameFilter, setFileNameFilter] = React.useState(null);

  React.useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    setError(null);
    const url = new URL('http://localhost:3000/files/data');
    if (fileNameFilter) {
      url.searchParams.append('fileName', fileNameFilter);
    }
    fetch(url.toString(), {
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
  }, [fileNameFilter]);

  const handleFileClick = (fileName) => {
    if (fileName === fileNameFilter) {
      setFileNameFilter(null);
    } else {
      setFileNameFilter(fileName);
    }
  };

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
              <td><a href="#" onClick={() => handleFileClick(file.file)}>{file.file}</a></td>
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
