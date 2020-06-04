import React from 'react';
import ChipInput from 'material-ui-chip-input';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import useStyles from './styles';
import UIButton from '../Button';

function RepositoryForm({ onClick }) {
  const [repository, setRepository] = React.useState({
    title: '',
    url: '',
    techs: [],
  });

  const classes = useStyles();

  const handleChange = (prop) => (e) => {
    setRepository({ ...repository, [prop]: e.target.value });
  };

  const handleAddTech = (tech) =>
    setRepository({ ...repository, techs: [...repository.techs, tech] });

  const handleDeleteTech = (tech) =>
    setRepository({
      ...repository,
      techs: repository.techs.filter((item) => item !== tech),
    });

  const handleFormClick = () => onClick(repository);

  return (
    <div className={classes.form}>
      <OutlinedInput
        placeholder='Título do repositório'
        className={classes.input}
        color='primary'
        onChange={handleChange('title')}
      />
      <OutlinedInput
        placeholder='Url do repositório'
        className={classes.input}
        color='primary'
        onChange={handleChange('url')}
      />
      <ChipInput
        variant='standard'
        placeholder='Tecnologias'
        value={repository.techs}
        onAdd={(tech) => handleAddTech(tech)}
        onDelete={(tech, index) => handleDeleteTech(tech)}
      />
      <UIButton onClick={handleFormClick} color='primary' label='Adicionar' />
    </div>
  );
}

export default RepositoryForm;
