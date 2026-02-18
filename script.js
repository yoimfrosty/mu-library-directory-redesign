document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('mu-lib-directory-cards');
  if (!root) return;

  const btnSubjects = root.querySelector('#btn-subjects');
  const btnAll = root.querySelector('#btn-all');
  const cards = Array.from(root.querySelectorAll('.card'));

  const searchInput = root.querySelector('#search-input');
  const departmentSelect = root.querySelector('#department-select');
  const clearBtn = root.querySelector('#clear-btn');

  const searchResult = root.querySelector('#search-result');

  const gridContainer = root.querySelector('.grid');

  // --- Accessibility fix: replace empty heading (#result-name) with <p> until populated
  const resultNameEl = root.querySelector('#result-name');
  if (resultNameEl && resultNameEl.tagName === 'H5') {
    const replacement = document.createElement('p');
    replacement.id = 'result-name';
    replacement.className = resultNameEl.className;
    replacement.innerHTML = resultNameEl.innerHTML; // keep &nbsp; if present
    resultNameEl.replaceWith(replacement);

    const observer = new MutationObserver(() => {
      if (replacement.textContent.trim()) {
        replacement.setAttribute('role', 'heading');
        replacement.setAttribute('aria-level', '5');
      } else {
        replacement.removeAttribute('role');
        replacement.removeAttribute('aria-level');
      }
    });
    observer.observe(replacement, { childList: true, characterData: true, subtree: true });
  }

  function getLastName(card) {
    const nameElement = card.querySelector('.name');
    if (!nameElement) return '';
    const fullName = nameElement.textContent.trim();
    const nameParts = fullName.split(' ');
    const lastName = nameParts[nameParts.length - 1].replace(/[()]/g, '');
    return lastName.toLowerCase();
  }

  // Sort all cards by last name and reorder DOM
  const sortedCards = cards.sort((a, b) => {
    const lastNameA = getLastName(a);
    const lastNameB = getLastName(b);
    return lastNameA.localeCompare(lastNameB);
  });

  sortedCards.forEach(card => {
    gridContainer.appendChild(card);
  });

  // Department to librarian mapping
  const departmentMap = {
    'African-American Studies': {
      name: 'Michele Santamaria',
      title: 'Student Engagement & Learning Design Librarian',
      email: 'michele.santamaria@millersville.edu',
      photo: 'https://d2jv02qf7xgjwx.cloudfront.net/customers/3087/images/2025Michele_Santamaria.jpg',
      schedule: 'https://library.millersville.edu/prf.php?account_id=53862'
    },
    'Applied Engineering, Safety & Technology': {
      name: 'Krista Higham',
      title: 'Access Services & Scholarly Communication Librarian',
      email: 'krista.higham@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/krista_higham.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59103678-7cdb-11ed-9922-0ad758b798c3'
    },
    'Art & Design': {
      name: 'Kim Auger',
      title: 'User Experience Librarian',
      email: 'kimberly.auger@millersville.edu',
      photo: 'https://libapps.s3.amazonaws.com/accounts/146774/images/Kim_on_zoom-square.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=5b41860f-7cdb-11ed-9922-0ad758b798c3'
    },
    'Biology': {
      name: 'Melissa Gold',
      title: 'Science Librarian',
      email: 'melissa.gold@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/m_gold_Cropped.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59104b93-7cdb-11ed-9922-0ad758b798c3'
    },
    'Business Administration': {
      name: 'Scott Anderson',
      title: 'Systems Librarian',
      email: 'scott.anderson@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/s_anderson_cropped_2.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59103153-7cdb-11ed-9922-0ad758b798c3'
    },
    'Chemistry': {
      name: 'Melissa Gold',
      title: 'Science Librarian',
      email: 'melissa.gold@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/m_gold_Cropped.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59104b93-7cdb-11ed-9922-0ad758b798c3'
    },
    'Communication & Theatre': {
      name: 'Kim Auger',
      title: 'User Experience Librarian',
      email: 'kimberly.auger@millersville.edu',
      photo: 'https://libapps.s3.amazonaws.com/accounts/146774/images/Kim_on_zoom-square.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=5b41860f-7cdb-11ed-9922-0ad758b798c3'
    },
    'Computer Science': {
      name: 'Scott Anderson',
      title: 'Systems Librarian',
      email: 'scott.anderson@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/s_anderson_cropped_2.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59103153-7cdb-11ed-9922-0ad758b798c3'
    },
    'Criminology, Sociology & Anthropology': {
      name: 'Michele Santamaria',
      title: 'Student Engagement & Learning Design Librarian',
      email: 'michele.santamaria@millersville.edu',
      photo: 'https://d2jv02qf7xgjwx.cloudfront.net/customers/3087/images/2025Michele_Santamaria.jpg',
      schedule: 'https://library.millersville.edu/prf.php?account_id=53862'
    },
    'Earth Sciences': {
      name: 'Melissa Gold',
      title: 'Science Librarian',
      email: 'melissa.gold@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/m_gold_Cropped.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59104b93-7cdb-11ed-9922-0ad758b798c3'
    },
    'Economics': {
      name: 'Scott Anderson',
      title: 'Systems Librarian',
      email: 'scott.anderson@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/s_anderson_cropped_2.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59103153-7cdb-11ed-9922-0ad758b798c3'
    },
    'Educational Foundations': {
      name: 'Stephanie Thompson',
      title: 'Education Librarian',
      email: 'stephanie.thompson@millersville.edu',
      photo: 'https://libapps.s3.amazonaws.com/customers/3087/images/Penucci.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=5a39c432-7cdb-11ed-9922-0ad758b798c3'
    },
    'Early, Middle & Elementary Education': {
      name: 'Stephanie Thompson',
      title: 'Education Librarian',
      email: 'stephanie.thompson@millersville.edu',
      photo: 'https://libapps.s3.amazonaws.com/customers/3087/images/Penucci.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=5a39c432-7cdb-11ed-9922-0ad758b798c3'
    },
    'Emergency Management': {
      name: 'Greg Szczyrbak',
      title: 'Information Literacy Librarian',
      email: 'greg.szczyrbak@millersville.edu',
      photo: 'https://libapps.s3.amazonaws.com/customers/3087/images/GregHeadshot2023.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=58fa29f4-7cdb-11ed-9922-0ad758b798c3'
    },
    'English & World Languages': {
      name: 'Michele Santamaria',
      title: 'Student Engagement & Learning Design Librarian',
      email: 'michele.santamaria@millersville.edu',
      photo: 'https://d2jv02qf7xgjwx.cloudfront.net/customers/3087/images/2025Michele_Santamaria.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59797d22-7cdb-11ed-9922-0ad758b798c3'
    },
    'Entrepreneurship': {
      name: 'Scott Anderson',
      title: 'Systems Librarian',
      email: 'scott.anderson@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/s_anderson_cropped_2.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59103153-7cdb-11ed-9922-0ad758b798c3'
    },
    'Geography': {
      name: 'Krista Higham',
      title: 'Access Services & Scholarly Communication Librarian',
      email: 'krista.higham@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/krista_higham.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59103678-7cdb-11ed-9922-0ad758b798c3'
    },
    'Government, Policy & Law': {
      name: 'Teresa Weisser',
      title: 'Cataloging & Metadata Librarian; Government Documents Coordinator',
      email: 'teresa.weisser@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/WeisserT_0.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59103b40-7cdb-11ed-9922-0ad758b798c3'
    },
    'History': {
      name: 'Frank Vitale IV',
      title: 'Special Collections Librarian & University Archivist',
      email: 'frank.vitale@millersville.edu',
      photo: 'https://libapps.s3.amazonaws.com/customers/3087/images/SmallSquareFrank_Vitale_8_Fav.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=62293bea-7cdb-11ed-9922-0ad758b798c3'
    },
    'Integrated Studies': {
      name: 'Kim Auger',
      title: 'User Experience Librarian',
      email: 'kimberly.auger@millersville.edu',
      photo: 'https://libapps.s3.amazonaws.com/accounts/146774/images/Kim_on_zoom-square.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=5b41860f-7cdb-11ed-9922-0ad758b798c3'
    },
    'International Studies': {
      name: 'Teresa Weisser',
      title: 'Cataloging & Metadata Librarian; Government Documents Coordinator',
      email: 'teresa.weisser@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/WeisserT_0.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59103b40-7cdb-11ed-9922-0ad758b798c3'
    },
    'Latino/a Studies': {
      name: 'Michele Santamaria',
      title: 'Student Engagement & Learning Design Librarian',
      email: 'michele.santamaria@millersville.edu',
      photo: 'https://d2jv02qf7xgjwx.cloudfront.net/customers/3087/images/2025Michele_Santamaria.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59797d22-7cdb-11ed-9922-0ad758b798c3'
    },
    'Mathematics': {
      name: 'Scott Anderson',
      title: 'Systems Librarian',
      email: 'scott.anderson@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/s_anderson_cropped_2.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59103153-7cdb-11ed-9922-0ad758b798c3'
    },
    'Music': {
      name: 'Tatiana Pashkova-Balkenhol',
      title: 'Undergraduate Research & Instruction Librarian',
      email: 'tatiana.pashkova.balkenhol@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/t_pb_cropped.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=598f7dc7-7cdb-11ed-9922-0ad758b798c3'
    },
    'Nursing': {
      name: 'Melissa Gold',
      title: 'Science Librarian',
      email: 'melissa.gold@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/m_gold_Cropped.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59104b93-7cdb-11ed-9922-0ad758b798c3'
    },
    'Philosophy': {
      name: 'Frank Vitale IV',
      title: 'Special Collections Librarian & University Archivist',
      email: 'frank.vitale@millersville.edu',
      photo: 'https://libapps.s3.amazonaws.com/customers/3087/images/SmallSquareFrank_Vitale_8_Fav.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=62293bea-7cdb-11ed-9922-0ad758b798c3'
    },
    'Physics': {
      name: 'Melissa Gold',
      title: 'Science Librarian',
      email: 'melissa.gold@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/m_gold_Cropped.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=59104b93-7cdb-11ed-9922-0ad758b798c3'
    },
    'Psychology': {
      name: 'Greg Szczyrbak',
      title: 'Information Literacy Librarian',
      email: 'greg.szczyrbak@millersville.edu',
      photo: 'https://libapps.s3.amazonaws.com/customers/3087/images/GregHeadshot2023.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=58fa29f4-7cdb-11ed-9922-0ad758b798c3'
    },
    'Social Work': {
      name: 'Tatiana Pashkova-Balkenhol',
      title: 'Undergraduate Research & Instruction Librarian',
      email: 'tatiana.pashkova.balkenhol@millersville.edu',
      photo: 'https://s3.amazonaws.com/libapps/customers/3087/images/t_pb_cropped.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=598f7dc7-7cdb-11ed-9922-0ad758b798c3'
    },
    'Special Education': {
      name: 'Stephanie Thompson',
      title: 'Education Librarian',
      email: 'stephanie.thompson@millersville.edu',
      photo: 'https://libapps.s3.amazonaws.com/customers/3087/images/Penucci.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=5a39c432-7cdb-11ed-9922-0ad758b798c3'
    },
    'Wellness': {
      name: 'Stephanie Thompson',
      title: 'Education Librarian',
      email: 'stephanie.thompson@millersville.edu',
      photo: 'https://libapps.s3.amazonaws.com/customers/3087/images/Penucci.jpg',
      schedule: 'https://library.millersville.edu/prf.php?id=5a39c432-7cdb-11ed-9922-0ad758b798c3'
    },
    "Women's, Gender & Sexuality Studies": {
      name: 'Michele Santamaria',
      title: 'Student Engagement & Learning Design Librarian',
      email: 'michele.santamaria@millersville.edu',
      photo: 'https://d2jv02qf7xgjwx.cloudfront.net/customers/3087/images/2025Michele_Santamaria.jpg',
      schedule: 'https://library.millersville.edu/prf.php?account_id=53862'
    },
    'Resource Sharing': {
      name: 'Ash Radtke',
      title: 'Resource Sharing Technician',
      email: 'Ash.Radtke@millersville.edu',
      photo: 'https://d2jv02qf7xgjwx.cloudfront.net/customers/3087/images/AR_Headshot.jpg',
      schedule: '#'
    }
  };

  // Toggle functionality
  function showSubjectsOnly() {
    cards.forEach(card => {
      card.classList.toggle('is-hidden', !card.classList.contains('subject-librarian'));
    });
    btnSubjects.classList.add('active');
    btnAll.classList.remove('active');
  }

  function showAll() {
    cards.forEach(card => card.classList.remove('is-hidden'));
    btnAll.classList.add('active');
    btnSubjects.classList.remove('active');
  }

  if (btnSubjects) btnSubjects.addEventListener('click', showSubjectsOnly);
  if (btnAll) btnAll.addEventListener('click', showAll);

  // Search result rendering (scoped to root)
  function displayResult(librarian, department) {
    const photo = root.querySelector('#result-photo');
    const name = root.querySelector('#result-name');
    const title = root.querySelector('#result-title');
    const dept = root.querySelector('#result-department');
    const email = root.querySelector('#result-email');
    const schedule = root.querySelector('#result-schedule');

    if (photo) {
      photo.src = librarian.photo;
      photo.alt = librarian.name;
    }
    if (name) name.textContent = librarian.name;
    if (title) title.textContent = librarian.title;

    const genericPositions = new Set([
      'Position: Resource Sharing',
      'Position: Cataloging & Metadata',
      'Position: Access Services',
      'Position: Acquisitions',
      'Position: Technology Support (Access Services)',
      'Position: Administrative Support',
      'Position: Archives',
      'Position: Library Operations'
    ]);

    if (dept) {
      dept.textContent = genericPositions.has(department) ? '' : ('Department: ' + department);
    }

    if (email) email.href = 'mailto:' + librarian.email;
    if (schedule) schedule.href = librarian.schedule;

    if (searchResult) searchResult.classList.add('active');
  }

  function clearSearch() {
    if (searchInput) searchInput.value = '';
    if (departmentSelect) departmentSelect.value = '';
    if (searchResult) searchResult.classList.remove('active');
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.trim().toLowerCase();
      if (query.length < 3) {
        if (searchResult) searchResult.classList.remove('active');
        return;
      }

      for (const [dept, librarian] of Object.entries(departmentMap)) {
        if (dept.toLowerCase().includes(query) || librarian.name.toLowerCase().includes(query)) {
          displayResult(librarian, dept);
          return;
        }
      }

      if (searchResult) searchResult.classList.remove('active');
    });
  }

  if (departmentSelect) {
    departmentSelect.addEventListener('change', function () {
      const selected = this.value;
      if (selected && departmentMap[selected]) {
        displayResult(departmentMap[selected], selected);
      } else {
        if (searchResult) searchResult.classList.remove('active');
      }
    });
  }

  if (clearBtn) clearBtn.addEventListener('click', clearSearch);

  // Initialize view
  showAll();

  // Enforce readable titles (kept from your code)
  const enforceReadableTitles = () => {
    const titles = root.querySelectorAll('.card .title');
    titles.forEach(el => {
      el.style.setProperty('font-size', '16px', 'important');
      el.style.setProperty('line-height', '1.4', 'important');
      el.style.setProperty('color', '#111', 'important');
    });
  };

  enforceReadableTitles();
  if (btnSubjects) btnSubjects.addEventListener('click', () => setTimeout(enforceReadableTitles, 50));
  if (btnAll) btnAll.addEventListener('click', () => setTimeout(enforceReadableTitles, 50));
});