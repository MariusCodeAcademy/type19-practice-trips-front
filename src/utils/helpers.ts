// sukurti funkcija kuri priima data 2021-12-09T22:00:00.000Z

// o grazinam lietuvisku datos formatu be laiko

// getNiceDate(dateString)

export function getNiceDate(dateString: string): string {
  const dateObj = new Date(dateString);
  const formatedDate = dateObj.toLocaleDateString('lt-LT', { dateStyle: 'medium' });
  return formatedDate;
}

// export

// panaudojam Single trip page
