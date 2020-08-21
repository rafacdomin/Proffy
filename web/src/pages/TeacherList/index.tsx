import React, { useState, useEffect } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import { ListPage, SearchTeacher, List } from './styles';
import { SubmitHandler } from '@unform/core';

interface FormData {
  subject: string;
  week_day: number;
  time: string;
}

export default function TeacherList() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function loadClasses() {
      const response = await api.get('classes');

      setClasses(response.data);
    }

    loadClasses();
  }, []);

  const searchTeachers: SubmitHandler<FormData> = async ({
    subject,
    week_day,
    time,
  }) => {
    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setClasses(response.data);
  };

  return (
    <ListPage>
      <PageHeader title="Estes são os proffys disponíveis.">
        <SearchTeacher onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'História', label: 'História' },
              { value: 'Português', label: 'Português' },
              { value: 'Inglês', label: 'Inglês' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Física', label: 'Física' },
              { value: 'Química', label: 'Química' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Filosofia', label: 'Filosofia' },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input type="time" name="time" label="Hora" />

          <button type="submit">Buscar</button>
        </SearchTeacher>
      </PageHeader>

      <List>
        {classes.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </List>
    </ListPage>
  );
}
