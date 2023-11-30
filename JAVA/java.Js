function cargarComentarios() {
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentarios.forEach(comentario => {
      agregarComentario(comentario.nombre, comentario.mensaje, comentario.likes || 0);
    });
  }

  function guardarComentarios() {
    const divComentarios = document.getElementById('comentarios');
    const comentarios = Array.from(divComentarios.children).map(div => {
      const nombre = div.querySelector('.nombre').textContent;
      const mensaje = div.querySelector('.mensaje').textContent;
      const likes = parseInt(div.querySelector('.likes').textContent);
      return { nombre, mensaje, likes };
    });
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
  }

  function agregarComentario(nombre, mensaje, likes) {
    const nuevoComentario = document.createElement('div');
    nuevoComentario.innerHTML = `
      <strong class="nombre">${nombre}</strong>: 
      <span class="mensaje">${mensaje}</span>
      <span class="accion editar">Editar</span>
      <span class="accion eliminar">Eliminar</span>
      <span class="likes">${likes}</span>
      <span class="like-btn">Like</span>
    `;

    nuevoComentario.querySelector('.editar').addEventListener('click', function() {
      const nuevoMensaje = prompt('Edita tu comentario:', mensaje);
      if (nuevoMensaje !== null) {
        nuevoComentario.querySelector('.mensaje').textContent = nuevoMensaje;
        guardarComentarios();
      }
    });

    nuevoComentario.querySelector('.eliminar').addEventListener('click', function() {
      nuevoComentario.remove();
      guardarComentarios();
    });

    const likeBtn = nuevoComentario.querySelector('.like-btn');
    likeBtn.addEventListener('click', function() {
      const likesSpan = nuevoComentario.querySelector('.likes');
      let likes = parseInt(likesSpan.textContent);
      likes++;
      likesSpan.textContent = likes;
      likeBtn.classList.add('liked');
      guardarComentarios();
    });

    document.getElementById('comentarios').appendChild(nuevoComentario);
  }

  document.getElementById('formulario-comentario').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const mensaje = document.getElementById('mensaje').value;

    agregarComentario(nombre, mensaje, 0);
    guardarComentarios();

    document.getElementById('nombre').value = '';
    document.getElementById('mensaje').value = '';
  });

  cargarComentarios();