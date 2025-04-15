$('.exchange__block-form').on('submit', function (event) {

    event.stopPropagation();
    event.preventDefault();

    let form = this,
        submit = $('.submit', form),
        data = new FormData(),
        files = $('input[type=file]')

    $('.submit', form).val('Отправка...');
    $('input, textarea', form).attr('disabled','');

    data.append('Crypto 1', $('[id="cr_send"]', form).html());
    data.append( 'Send', 		$('[name="u_send"]', form).val() );
    data.append('Crypto 2', $('[id="cr_receive"]', form).html());
    data.append( 'Receive', 		$('[name="u_receive"]', form).val() );
    data.append( 'receive-address', 		$('[name="receive-address"]', form).val() );
    data.append( 'E-mail', 		$('[name="E-mail"]', form).val() );
    data.append( 'referral_code', 		$('[name="referral_code"]', form).val() );



   

    files.each(function (key, file) {
        let cont = file.files;
        if ( cont ) {
            $.each( cont, function( key, value ) {
                data.append( key, value );
            });
        }
    });
    
    $.ajax({
        url: 'ajax.php',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        xhr: function() {
            let myXhr = $.ajaxSettings.xhr();

            if ( myXhr.upload ) {
                myXhr.upload.addEventListener( 'progress', function(e) {
                    if ( e.lengthComputable ) {
                        let percentage = ( e.loaded / e.total ) * 100;
                            percentage = percentage.toFixed(0);
                        $('.submit', form)
                            .html( percentage + '%' );
                    }
                }, false );
            }

            return myXhr;
        },
        error: function( jqXHR, textStatus ) {
            // Тут выводим ошибку
        },
        complete: function() {
            // Тут можем что-то делать ПОСЛЕ успешной отправки формы
            console.log('Complete')
            form.reset() 
        }
    });

    return false;
});



const currencyToCountry = {
    USD: "US" ,
    EUR: "EU",
    GBP: "GB",
    AUD: "AU",
    CHF: "CH",
    CAD: "CA",
    JPY: "JP",
    EGP: "EG",
    KRW: "KR",
    DZD: "DZ",
    PAB: "PA",
    BHD: "BH",
    MAD: "MA",
    ZAR: "ZA",
    IQD: "IQ",
    BOB: "BO",
    HKD: "HK",
    THB: "TH",
    TWD: "TW",
    UZS: "UZ",
    KWD: "KW",
    ILS: "IL",
    PEN: "PE",
    TJS: "TJ",
    OMR: "OM",
    HUF: "HU",
    UAH: "UA",
    CLP: "CL",
    SEK: "SE",
    SGD: "SG",
    CNY: "CN",
    ISK: "IS",
    AZN: "AZ",
    HTG: "HT",
    DOP: "DO",
    LBP: "LB",
    MYR: "MY",
    IRR: "IR",
    UYU: "UY",
    ANG: "AN",
    PHP: "PH",
    XOF: "",
    LYD: "LY",
    JOD: "JO",
    TRY: "TR",
    NGN: "NG",
    RSD: "RS",
    NZD: "NZ",
    CZK: "CZ",
    BYN: "BY",
    ARS: "AR",
    NOK: "NO",
    QAR: "QA",
    BDT: "BD",
    RON: "RO",
    MDL: "MD",
    CRC: "CR",
    VES: "VE",
    IDR: "ID",
    MXN: "MX",
    AMD: "AM",
    PYG: "PY",
    AED: "AE",
    NPR: "NP",
    XAF: "",
    KGS: "KG",
    BRL: "BR",
    INR: "IN",
    TND: "TN",
    VND: "VN",
    TMT: "TM",
    DKK: "DK",
    LKR: "LK",
    BGN: "BG",
    RUB: "RU",
    GEL: "GE",
    PKR: "PK",
    PLN: "PL",
    KZT: "KZ",
    COP: "CO",
    SAR: "SA",
  };
  
  const exchangeRates = { usd: 1 };
  const inputAmount = document.querySelector(
    ".converter-container .input-amount"
  );
  const result = document.querySelector(".converter-container .result");
  const swapBtn = document.querySelector(".converter-container .swap-btn");
  
  const currentValues = {
    fromCurrency: "USD - U.S. Dollar",
    fromFlag: "https://www.countryflagicons.com/FLAT/64/US.png",
    fromCode: "USD",
    toCurrency: "EUR - Euro",
    toFlag: "https://www.countryflagicons.com/FLAT/64/EU.png",
    toCode: "EUR",
  };
  
  const convert = () => {
    const inputValue = parseFloat(inputAmount.value);
    const fromCurrencyValue = document
      .querySelector("#from .currency-input")
      .dataset.selectedCurrencyCode.toLowerCase();
    const toCurrencyValue = document
      .querySelector("#to .currency-input")
      .dataset.selectedCurrencyCode.toLowerCase();
  
    const convertedValue =
      (inputValue * exchangeRates[toCurrencyValue]) /
      exchangeRates[fromCurrencyValue];
  
    const resultValue = `<span class='result-currency'>${toCurrencyValue}</span> ${convertedValue.toFixed(
      2
    )}`;
  
    result.innerHTML = isNaN(convertedValue) ? "Invalid Input" : resultValue;
  };
  
  swapBtn.addEventListener("click", () => {
    const tempFromCurrency = currentValues.fromCurrency;
    const tempFromFlag = currentValues.fromFlag;
    const tempFromCode = currentValues.fromCode;
  
    currentValues.fromCurrency = currentValues.toCurrency;
    currentValues.fromFlag = currentValues.toFlag;
    currentValues.fromCode = currentValues.toCode;
  
    currentValues.toCurrency = tempFromCurrency;
    currentValues.toFlag = tempFromFlag;
    currentValues.toCode = tempFromCode;
  
    updateValues();
  
    convert();
  });
  
  const createFlagImage = (currencyCode) => {
    const countryCode = currencyToCountry[currencyCode];
    const img = document.createElement("img");
  
    if (countryCode === "" || !countryCode) {
      img.src = "images/flag-placeholder.png";
    } else {
      img.src = `https://www.countryflagicons.com/FLAT/64/${countryCode}.png`;
    }
  
    img.classList.add("flag-icion");
    return img;
  };
  
  const setInputValues = (currency, flag, code, id) => {
    const dropdown = document.querySelector(`#${id}`);
    const currencyInput = dropdown.querySelector(".currency-input");
    const inputFlag = dropdown.querySelector(".input-flag");
  
    currencyInput.value = currency;
    inputFlag.src = flag;
    inputFlag.style.display = "block";
    currencyInput.style.paddingLeft = "48px";
    currencyInput.dataset.selectedCurrencyCode = code;
  };
  
  const updateValues = () => {
    setInputValues(
      currentValues.fromCurrency,
      currentValues.fromFlag,
      currentValues.fromCode,
      "from"
    );
  
    setInputValues(
      currentValues.toCurrency,
      currentValues.toFlag,
      currentValues.toCode,
      "to"
    );
  };
  
  const createOption = (code, name, id) => {
    if (!id) return;
  
    const dropdown = document.querySelector(`#${id}`);
    const option = document.createElement("div");
    option.classList.add("option");
  
    const flagImage = createFlagImage(code);
  
    const flagDiv = document.createElement("div");
    flagDiv.classList.add("flag");
    flagDiv.appendChild(flagImage);
  
    const currencyText = `${code} - ${name}`;
    const currencyDiv = document.createElement("div");
    currencyDiv.textContent = currencyText;
  
    option.appendChild(flagDiv);
    option.appendChild(currencyDiv);
  
    option.addEventListener("click", () => {
      options.classList.remove("active");
      setInputValues(currencyText, flagImage.src, code, id);
  
      if (id === "from") {
        currentValues.fromCurrency = currencyText;
        currentValues.fromFlag = flagImage.src;
        currentValues.fromCode = code;
      } else if (id === "to") {
        currentValues.toCurrency = currencyText;
        currentValues.toFlag = flagImage.src;
        currentValues.toCode = code;
      }
  
      convert();
    });
  
    const options = dropdown.querySelector(".options");
    options.appendChild(option);
  };
  
  const addEventListeners = (id) => {
    const dropdown = document.querySelector(`#${id}`);
    const currencyInput = dropdown.querySelector(".currency-input");
    const inputFlag = dropdown.querySelector(".input-flag");
    const options = dropdown.querySelector(".options");
    const allOptions = dropdown.querySelectorAll(".option");
  
    currencyInput.addEventListener("input", () => {
      filterOptions(id, allOptions);
    });
  
    currencyInput.addEventListener("click", () => {
      if (id === "from") {
        const toDropdownOptions = document.querySelector("#to .options");
        toDropdownOptions.classList.remove("active");
  
        setInputValues(
          currentValues.toCurrency,
          currentValues.toFlag,
          currentValues.toCode,
          "to"
        );
      } else if (id === "to") {
        const fromDropdownOptions = document.querySelector("#from .options");
        fromDropdownOptions.classList.remove("active");
  
        setInputValues(
          currentValues.fromCurrency,
          currentValues.fromFlag,
          currentValues.fromCode,
          "from"
        );
      }
  
      inputFlag.style.display = "none";
      currencyInput.value = "";
      currencyInput.style.paddingLeft = "16px";
      options.classList.add("active");
  
      if (allOptions) {
        filterOptions(id, allOptions);
      }
    });
  };
  
  const init = async () => {
    try {
      const res = await fetch("http://www.floatrates.com/daily/usd.json");
      const data = await res.json();
  
      if (res.ok) {
        console.log(data);
        createOption("USD", "U.S. Dollar", "from");
        createOption("USD", "U.S. Dollar", "to");
  
        for (const currencyCode in data) {
          const currencyInfo = data[currencyCode];
          const { code, name } = currencyInfo;
          createOption(code, name, "from");
          createOption(code, name, "to");
  
          exchangeRates[currencyCode] = currencyInfo.rate;
        }
  
        updateValues();
  
        addEventListeners("from");
        addEventListeners("to");
  
        convert();
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  init();
  
  const filterOptions = (id, allOptions) => {
    const dropdown = document.querySelector(`#${id}`);
    const currencyInput = dropdown.querySelector(".currency-input");
    const searchTerm = currencyInput.value.toLowerCase();
  
    allOptions.forEach((option) => {
      const currencyText = option.textContent.toLowerCase();
  
      if (currencyText.includes(searchTerm)) {
        option.style.display = "flex";
      } else {
        option.style.display = "none";
      }
    });
  };
  
  document.addEventListener("click", (e) => {
    const from = document.querySelector("#from");
    const to = document.querySelector("#to");
    const fromOptions = document.querySelector("#from .options");
    const toOptions = document.querySelector("#to .options");
  
    if (
      e.target !== from &&
      e.target !== to &&
      !from.contains(e.target) &&
      !to.contains(e.target) &&
      !toOptions.contains(e.target) &&
      !fromOptions.contains(e.target)
    ) {
      toOptions.classList.remove("active");
      fromOptions.classList.remove("active");
  
      updateValues();
    }
  });
  
  inputAmount.addEventListener("input", convert);
  