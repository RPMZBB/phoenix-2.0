    let stepper;

    document.addEventListener("DOMContentLoaded", function () {
      stepper = new window.Stepper(document.querySelector("#stepper"));
      showStep("logins-part");

      // Teilnehmerformular absenden
      document.getElementById("teilnehmerForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Teilnehmer erfolgreich erstellt!");
        const modal = bootstrap.Modal.getInstance(document.getElementById("teilnehmerModal"));
        modal.hide();
        this.reset();
        stepper.to(1);
        showStep("logins-part");
      });

      // Navigation zu Seiten
      const links = document.querySelectorAll('[data-target]');
      const pages = document.querySelectorAll('.content-page');
      links.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          const target = link.getAttribute('data-target');
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          pages.forEach(p => p.classList.add('d-none'));
          const page = document.getElementById(target);
          if (page) page.classList.remove('d-none');
        });
      });

      // Accordion Verhalten: beim erneuten Klick wieder zuklappen
      document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', function () {
          const collapse = document.querySelector(this.getAttribute('data-bs-target'));
          if (collapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(collapse);
            bsCollapse.hide();
          }
        });
      });
    });

    // Sichtbarer Step-Inhalt
    function showStep(id) {
      document.querySelectorAll('.bs-stepper-content .content').forEach(step => {
        step.classList.add('d-none');
      });
      const active = document.getElementById(id);
      if (active) active.classList.remove('d-none');
    }
	

  function enableProfilEdit() {
    const form = document.getElementById("profilForm");
    form.querySelectorAll("input").forEach(input => input.removeAttribute("readonly"));
    form.querySelectorAll("select").forEach(select => select.removeAttribute("disabled"));
  }

function toggleDetails(button) {
  const row = button.closest('tr');
  const detailRow = row.nextElementSibling;
  const allDetails = document.querySelectorAll('.detail-row');

  allDetails.forEach(r => {
    if (r !== detailRow) r.classList.add('d-none');
  });

  detailRow.classList.toggle('d-none');
}

function setAnwesend(button) {
  setActive(button, 'bg-success');
  document.getElementById('anwesenheit-zeiten').classList.remove('d-none');
  document.getElementById('sonderoptionen').classList.add('d-none');
}

function setActive(button, colorClass) {
  const all = button.parentElement.querySelectorAll('button');
  all.forEach(btn => {
    btn.classList.remove('bg-success', 'bg-warning', 'bg-info', 'bg-danger', 'bg-primary', 'text-white', 'text-dark');
    btn.classList.add('btn-outline-secondary');
  });
  button.classList.remove('btn-outline-secondary');
  colorClass.split(' ').forEach(c => button.classList.add(c));
}

function setSpecial(button, type) {
  const sonder = document.getElementById('sonderoptionen');
  const au = document.getElementById('auBtn');
  const urlaub = document.getElementById('urlaubFeld');
  const grund = document.getElementById('grundFeld');
  const zeiten = document.getElementById('anwesenheit-zeiten');

  setActive(button,
    type === 'krank' ? 'bg-warning text-dark'
    : type === 'entschuldigt' ? 'bg-info text-white'
    : type === 'unentschuldigt' ? 'bg-danger'
    : 'bg-primary');

  sonder.classList.remove('d-none');
  zeiten.classList.add('d-none');

  au.style.display = (type === 'krank' || type === 'entschuldigt') ? 'inline-block' : 'none';
  urlaub.style.display = (type === 'urlaub') ? 'inline-block' : 'none';
  grund.style.display = (type === 'entschuldigt' || type === 'unentschuldigt') ? 'block' : 'none';
}


  function showUebersicht() {
    document.querySelectorAll('.content-page, .tab-pane').forEach(el => el.classList.add('d-none'));
    document.getElementById('anwesenheits-uebersicht').classList.remove('d-none');
  }





  document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.sidebar a');
    const views = {
      dashboardView: document.getElementById('dashboardView'),
      nutzerView: document.getElementById('nutzerView'),
      projektView: document.getElementById('projektView'),
      projekteView: document.getElementById('projekteView'),
      projektDetailView: document.getElementById('projektDetailView') // <- Detailansicht für Projekt
    };

    // Sidebar Navigation
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const target = link.getAttribute('data-target');
        for (const key in views) {
          views[key].classList.toggle('hidden', key !== target);
        }
      });
    });

    // Klick auf Projektkarte öffnet Detailansicht
    document.querySelectorAll('.projekt-karte').forEach(card => {
      card.addEventListener('click', () => {
        for (const key in views) {
          views[key].classList.add('hidden');
        }
        views.projektDetailView.classList.remove('hidden');
      });
    });

    // Optional: Zurück-Button in Detailansicht (wenn eingebaut)
    const backBtn = document.getElementById('backToProjects');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        for (const key in views) {
          views[key].classList.add('hidden');
        }
        views.projekteView.classList.remove('hidden');
      });
    }
  });
