const form = document.getElementById('visit-form');
if (form) {
  const submit = form.querySelector('[type="submit"]');
  const confirmation = document.getElementById('confirmation');
  const service = document.getElementById('servico');
  const choice = new URLSearchParams(location.search).get('servico');
  if ([...service.options].some(option => option.value === choice)) service.value = choice;
  submit.disabled = false;
  const errors = { nome: 'Digite um nome para continuar.', email: 'Use um e-mail no formato nome@exemplo.com.' };
  function validate(field) {
    const invalid = !field.value.trim() || !field.validity.valid;
    field.setAttribute('aria-invalid', String(invalid));
    field.setAttribute('aria-describedby', `${field.id}-error`);
    document.getElementById(`${field.id}-error`).textContent = invalid ? errors[field.id] : '';
    return !invalid;
  }
  ['nome', 'email'].forEach(id => {
    const field = document.getElementById(id);
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validate(field);
    });
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = ['nome', 'email'].map(id => document.getElementById(id));
    const invalid = fields.filter(field => !validate(field));
    if (invalid.length) { invalid[0].focus(); return; }
    document.getElementById('request-summary').textContent = `Cuidado escolhido: ${service.selectedOptions[0].textContent}. Em um serviço real, o próximo passo seria combinar os detalhes da visita.`;
    form.hidden = true;
    confirmation.hidden = false;
    confirmation.focus();
  });
  document.getElementById('edit-request').addEventListener('click', () => {
    confirmation.hidden = true;
    form.hidden = false;
    document.getElementById('nome').focus();
  });
}
