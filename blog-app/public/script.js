document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-form').forEach(form => {
      form.addEventListener('submit', event => {
        if (!confirm('Are you sure you want to delete this post?')) {
          event.preventDefault();
        }
      });
    });
  });
  