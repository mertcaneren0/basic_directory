//Arayüz elementleri seçelim.

const ad = document.getElementById('ad');
const soyad = document.getElementById('soyad');
const mail = document.getElementById('mail');

const form = document.getElementById('form-rehber');
const kisiListesi = document.querySelector('.kisi-listesi');

//event listenerların tanımlanması
form.addEventListener('submit', kaydet);
kisiListesi.addEventListener('click', kisiIslemleriYap);



//tüm kişiler için dizi
const tumKisilerDizisi = [];
let secilenSatir = undefined;




function kisiIslemleriYap(event) {


    if (event.target.classList.contains('btn--delete')) {
        const silinecekTr = event.target.parentElement.parentElement;
        const silinecekMail = event.target.parentElement.previousElementSibling.textContent;
        rehberdenSil(silinecekTr, silinecekMail);
    } else if (event.target.classList.contains('btn--edit')) {
        document.querySelector('.kaydetGuncelle').value = "Güncelle";
        const secilenTR = event.target.parentElement.parentElement;
        //const guncellenecekMail =
    }
}

function rehberdenSil(silinecekTrElement, silinecekMail) {
    silinecekTrElement.remove();

    //maile göre silme işlemi
    /*tumKisilerDizisi.forEach((kisi, index) => {
        if (kisi.mail === silinecekMail) {
            tumKisilerDizisi.splice(index, 1);
        }
    });*/

    const silinmeyecekKisiler = tumKisilerDizisi.filter(function(kisi, index) {
        return kisi.mail !== silinecekMail;
    });

    tumKisilerDizisi.length = 0;
    tumKisilerDizisi.push(...silinmeyecekKisiler);

    console.log("silme yapıldı.");
    console.log(tumKisilerDizisi);

}

function kaydet(e) {
    e.preventDefault();

    const eklenecekveyaGuncellenecekKisi = {
        ad: ad.value,
        soyad: soyad.value,
        mail: mail.value
    }

    const sonuc = verileriKontrolEt(eklenecekveyaGuncellenecekKisi);
    if (sonuc.durum) {
        if (secilenSatir) {
            //güncelleme yap
        } else {
            kisiyiEkle(eklenecekveyaGuncellenecekKisi);
        }
        //bilgiOlustur(sonuc.mesaj, sonuc.durum);

    } else {
        bilgiOlustur(sonuc.mesaj, sonuc.durum);

    }
    //console.log(eklenecekKisi);
}

function kisiyiEkle(eklenecekveyaGuncellenecekKisi) {

    const olusturulanTrElementi = document.createElement('tr');
    olusturulanTrElementi.innerHTML = `
    <td>${eklenecekveyaGuncellenecekKisi.ad}</td>
    <td>${eklenecekveyaGuncellenecekKisi.soyad}</td>
    <td>${eklenecekveyaGuncellenecekKisi.mail}</td>
    <td>
        <button class="btn btn--edit"><i class="far fa-edit"></i></button>
        <button class="btn btn--delete"><i class="far fa-trash-alt"></i></button>
    </td>`;

    kisiListesi.appendChild(olusturulanTrElementi);
    tumKisilerDizisi.push(eklenecekveyaGuncellenecekKisi);

    bilgiOlustur('Kişi rehbere kaydedildi', true);

}


function verileriKontrolEt(kisi) {
    //objelerde in kullanımı
    for (const deger in kisi) {
        if (kisi[deger]) {
            console.log(kisi[deger]);
        } else {
            const sonuc = {
                durum: false,
                mesaj: 'boş alan bırakmayınız....'
            }
            return sonuc;

        }
    }
    alanlariTemizle();
    return {
        durum: true,
        mesaj: 'Kaydedildi. '
    }
}

function bilgiOlustur(mesaj, durum) {
    const olusturulanBilgi = document.createElement('div');
    olusturulanBilgi.textContent = mesaj;
    olusturulanBilgi.className = 'bilgi';

    olusturulanBilgi.classList.add(durum ? 'bilgi--success' : 'bilgi--error');

    document.querySelector('.container').insertBefore(olusturulanBilgi, form);
    // olusturulanBilgi.classList.add(durum ? 'bilgi--success : 'bilgi--error);

    setTimeout(function() {
        const silinecekDiv = document.querySelector('.bilgi');
        if (silinecekDiv) {
            silinecekDiv.remove();
        }
    }, 2000);
}



function alanlariTemizle() {
    ad.value = ' ';
    soyad.value = ' ';
    mail.value = ' ';
}

//setTimeOut, setInterval
//setTimeOut belirlenen süre sonra çalıştır.
//setInterval belirlenen süre içinde çalıştır .