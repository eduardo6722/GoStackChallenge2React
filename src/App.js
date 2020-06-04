import React from 'react';

import './styles.css';

import RepositoryForm from './components/RepositoryForm';
import UIAppbar from './components/Topbar';
import api from './services/api';
import { REPOSITORIES } from './constants';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Chip, Link, Divider } from '@material-ui/core';
import UIButton from './components/Button';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 15,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});

function App() {
  const classes = useStyles();
  const [repositories, setRepositories] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get(REPOSITORIES);
      setRepositories(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  async function handleAddRepository(values) {
    try {
      const response = await api.post(REPOSITORIES, values);
      if (response?.data) {
        setRepositories([...repositories, response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`${REPOSITORIES}/${id}`);
      if (response?.status === 204) {
        setRepositories([...repositories.filter((item) => item.id !== id)]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='app'>
      <UIAppbar color='primary' title='Meus Projetos' />
      <RepositoryForm onClick={handleAddRepository} />
      <div data-testid='repository-list'>
        {repositories.map((repo) => (
          <Card key={repo.id} className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color='textPrimary'
                gutterBottom
              >
                {repo.title}
              </Typography>
              <Divider />
              <br />
              <Typography variant='body1' component='div'>
                {repo?.techs?.map((tech, index) => (
                  <Chip key={index} label={tech} />
                ))}
              </Typography>
              <br />
              <Divider />
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Link href={repo.url} target='_blank'>
                Repositório
              </Link>
              <UIButton
                stu
                color='secondary'
                label='Remover'
                onClick={() => handleRemoveRepository(repo.id)}
                size='small'
                customStyle={{ height: 30 }}
              />
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
