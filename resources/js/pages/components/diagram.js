export default `
flowchart TD
    dewanpembina[DEWAN PEMBINA]
    dewanpengawas[DEWAN PENGAWAS]
    dewanpenasihat[DEWAN PENASIHAT]
    ketuaumum[KETUA UMUM]
    sekjen[SEKRETARIS JENDRAL]
    bendahara[BENDAHARA]
    koordinatorumum[Koordinator Umum]
    humas[HUMAS]
    divisisar[DIVISI SAR]
    divisipertanian[DIVISI PERTANIAN, PERKEBUNAN & KEHUTANAN]
    divisiperairan[DIVISI PERAIRAN & KELAUTAN]
    divisipengolah[DIVISI PENGOLAHAN SAMPAN dan B3]
    divisirehab[DIVISI REHABILITASI KONSERVASI FLORA DAN FAUNA]
    divisipertambangan[DIVISI PERRTAMBANGAN DAN ENERGI]
    subgraph DEWAN
        direction LR
        dewanpembina -.- dewanpengawas -.- dewanpenasihat
    end

    DEWAN --> ketuaumum
    ketuaumum --> sekjen
    ketuaumum --> humas
    ketuaumum --> koordinatorumum
    ketuaumum --> bendahara
    humas --> ANGGOTA
    koordinatorumum --> ANGGOTA
    sekjen ---> sekretarijendral
    subgraph sekretarijendral
        direction LR
        divisisar -.- divisipertanian -.- divisiperairan
        divisipengolah -.- divisirehab -.- divisipertambangan
    end


`;
