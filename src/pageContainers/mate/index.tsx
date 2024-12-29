'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { DetailLocationIcon } from '@/assets';
import { Input, MateBottomSheet, NavigationHeader } from '@/components';
import { usePostMateInfo } from '@/hooks/apis/meet';
import { useGetGeoCode } from '@/hooks/apis/nominatim';
import { mateInfoSchema } from '@/schemas';
import { useDateStore, useMateSheetStore, useTimeStore } from '@/stores';
import { MateInfoFormType, Path } from '@/types';

import { useEffect, useState } from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as S from './style';

const MatePage = () => {
  const { push } = useRouter();
  const {
    register,
    formState: {
      errors: { title, location, addressDetail, startLocation, distance, date },
    },
    setValue,
    handleSubmit,
  } = useForm<MateInfoFormType>({
    resolver: zodResolver(mateInfoSchema),
  });

  const { mutate: postMateInfo } = usePostMateInfo({
    onSuccess: () => push(Path.MAIN),
  });

  const { isMateSheetOpen, openMateSheet } = useMateSheetStore();
  const { selectedDates } = useDateStore();
  const { AMPM, hour, minute } = useTimeStore();

  const daumPostCode = useDaumPostcodePopup();

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<{
    lat: string;
    lon: string;
  }>({ lat: '', lon: '' });
  const [rangeDate, setRangeDate] = useState<string>('');
  const [startAddress, setStartAddress] = useState<string>('');

  const { data: geoData } = useGetGeoCode(startAddress);

  useEffect(() => {
    if (geoData && Array.isArray(geoData) && geoData.length > 0) {
      const { lat, lon } = geoData[0];
      setCoordinates({ lat, lon });
    } else {
      setCoordinates({ lat: '', lon: '' });
    }
  }, [geoData]);

  const formatDate = (month: number, date: number) => `${month}월 ${date}일`;

  const isNull = AMPM === null || hour === null || minute === null;

  const formatTime = (
    AMPM: string | null,
    hour: number | null,
    minute: number | null
  ) => {
    const period = AMPM === 'AM' ? '오전' : '오후';
    const formattedHour = hour?.toString().padStart(2, '0');
    const formattedMinute = minute?.toString().padStart(2, '0');
    return `${period} ${formattedHour}시 ${formattedMinute}분`;
  };

  const formatDateISO = (year: number, month: number, date: number) => {
    const paddedMonth = String(month).padStart(2, '0');
    const paddedDate = String(date).padStart(2, '0');
    return `${year}-${paddedMonth}-${paddedDate}`;
  };

  const formatTimeISO = (
    AMPM: string | null,
    hour: number | null,
    minute: number | null
  ) => {
    let formattedHour = hour;
    if (AMPM === 'PM' && hour !== null && hour < 12) {
      formattedHour = hour + 12;
    } else if (AMPM === 'AM' && hour === 12) {
      formattedHour = 0;
    }

    const paddedHour = String(formattedHour).padStart(2, '0');
    const paddedMinute = String(minute).padStart(2, '0');
    return `${paddedHour}:${paddedMinute}`;
  };

  useEffect(() => {
    if (isClicked && !isNull && selectedDates.length > 0) {
      renderDateRange();
      renderISODateRange();
    }
  }, [isClicked, selectedDates, AMPM, hour, minute]);

  const renderDateRange = () => {
    let dateRange = '';

    if (isClicked === true && isNull === false) {
      if (selectedDates.length === 1) {
        const { month, date } = selectedDates[0];
        dateRange = `${formatDate(month, date)} ${formatTime(AMPM, hour, minute)}`;
      } else if (selectedDates.length > 1) {
        const { month: startMonth, date: startDate } = selectedDates[0];
        const { month: endMonth, date: endDate } =
          selectedDates[selectedDates.length - 1];
        dateRange = `${formatDate(startMonth, startDate)} - ${formatDate(endMonth, endDate)} / ${formatTime(AMPM, hour, minute)}`;
      }
    }

    setValue('date', dateRange);

    return dateRange;
  };

  const renderISODateRange = () => {
    if (selectedDates.length > 0) {
      const year = new Date().getFullYear();
      const { month, date } = selectedDates[0];

      const formattedDate = formatDateISO(year, month, date);
      const formattedTime = formatTimeISO(AMPM, hour, minute);
      const dateRange = `${formattedDate} ${formattedTime}`;

      setRangeDate(dateRange);
    }
    return '';
  };

  const handleBottomSheet = () => {
    if (
      selectedDates.length !== 0 &&
      AMPM !== null &&
      hour !== null &&
      minute !== null
    ) {
      setIsClicked(true);
    }
  };

  const handleDaumPostCodePopupComplete = async ({
    address,
    zonecode,
  }: Address) => {
    setValue('location', `${address} ${zonecode}`);
  };

  const handleLocationBtnClick = () =>
    daumPostCode({
      popupTitle: 'RUNNING HALLAE',
      onComplete: handleDaumPostCodePopupComplete,
    });

  const handleStartDaumPostCodePopupComplete = async ({
    address,
    zonecode,
  }: Address) => {
    const fullAddress = `${address} ${zonecode}`;
    setValue('startLocation', fullAddress);
    setStartAddress(address);
    console.log(address);
    console.log(fullAddress);
  };

  const handleStartLocationBtnClick = () =>
    daumPostCode({
      popupTitle: 'RUNNING HALLAE',
      onComplete: handleStartDaumPostCodePopupComplete,
    });

  const handleFormSubmit: SubmitHandler<MateInfoFormType> = ({
    title,
    distance,
    addressDetail,
  }) => {
    const body = {
      title: title,
      distance: distance,
      startAt: rangeDate,
      startLongitude: coordinates.lon,
      startLatitude: coordinates.lat,
      addressDetail: addressDetail,
    };
    postMateInfo(body);
  };

  return (
    <>
      <NavigationHeader navigateUrl={Path.MAIN} title={'런닝 모집하기'} />
      <S.Wrapper onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Input
          {...register('title')}
          inputTitle='제목'
          placeholder='제목을 입력해주세요.'
          errorMessage={title?.message}
        />
        <S.InputContainer>
          <S.ButtonContainer>
            <S.Title>장소</S.Title>
            <S.InputButton onClick={handleLocationBtnClick} type='button'>
              <Input
                {...register('location')}
                placeholder='위치를 알려주세요.'
                icon={<DetailLocationIcon />}
                style={{
                  pointerEvents: 'none',
                }}
                errorMessage={location?.message}
              />
            </S.InputButton>
            <Input
              {...register('addressDetail')}
              placeholder='상세주소를 알려주세요.'
              errorMessage={addressDetail?.message}
            />
          </S.ButtonContainer>
        </S.InputContainer>
        <S.InputContainer>
          <S.ButtonContainer>
            <S.Title>거리</S.Title>
            <S.InputButton onClick={handleStartLocationBtnClick} type='button'>
              <Input
                {...register('startLocation')}
                placeholder='출발 위치를 알려주세요.'
                icon={<DetailLocationIcon />}
                style={{
                  pointerEvents: 'none',
                }}
                errorMessage={startLocation?.message}
              />
            </S.InputButton>
            <Input
              {...register('distance', {
                valueAsNumber: true,
              })}
              placeholder='런닝 거리를 입력해주세요.'
              unit={'km'}
              errorMessage={distance?.message}
            />
          </S.ButtonContainer>
        </S.InputContainer>

        <S.ButtonContainer>
          <S.Title>약속</S.Title>
          <S.InputButton onClick={openMateSheet} type='button'>
            <Input
              {...register('date')}
              placeholder='만날 시간을 입력해주세요'
              style={{
                pointerEvents: 'none',
              }}
              errorMessage={date?.message}
              readOnly
            />
          </S.InputButton>
        </S.ButtonContainer>
        <S.ButtonWrapper>
          <S.ConfirmButton type='submit'>확인</S.ConfirmButton>
        </S.ButtonWrapper>
      </S.Wrapper>
      {isMateSheetOpen && <MateBottomSheet onClick={handleBottomSheet} />}
    </>
  );
};

export default MatePage;
