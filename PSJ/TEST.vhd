library ieee;
use ieee.std_logic_1164.all;
use ieee.std_logic_unsigned.all;
use ieee.std_logic_arith.all;

entity Take4 is
  port(
    -- input
    clk : in std_logic;
    H : in std_logic_vector(7 downto 1);
    e_prd :in std_logic_vector(3 downto 0);
    seed : in std_logic_vector(15 downto 0);
    -- output
    errorH : out std_logic_vector(7 downto 1));
end Take4;

architecture behav of Take4 is

signal x16 : std_logic:='0';
signal sig_random : std_logic_vector(15 downto 0);
signal start : std_logic:='0';
signal errorbit : std_logic_vector(2 downto 0);
signal error_cycle, num_cycle : std_logic_vector(3 downto 0);
begin

process(x16, clk, start, seed, errorbit, sig_random, H, num_cycle, error_cycle)
begin
  num_cycle <= "0000"; --initialize
  if clk'event and clk='1' then -- rising edge일때
    if start = '0' then
      sig_random <= seed;
      start <= '1'; -- 랜덤 변수 생성
    else
      x16 <= (sig_random(5) xor sig_random(4) xor sig_random(3) xor sig_random(0));
      sig_random <= x16 & sig_random(15 downto 1);
    end if;

    -- rising일 때마다 num_cycle 1씩 증가
    if    num_cycle < e_prd then num_cycle <= num_cycle + "0001";
    elsif num_cycle = e_prd then num_cycle <= "0000";
    end if;
  end if;

-- 위에서 랜덤코드 만든게 16비튼데 거기서 4비트 가져와서 11주기동안 언제 에러 만들건지
-- error_cycle에 랜덤넘버 넣어준건데 4비트가 1111까지니까 1011(11)보다 크면 그냥 5빼는걸로 했어
-- 7비트중에 어디다가 에러 넣을건지도 랜덤이니까 52줄이 errorbit만드는거고 그 에러 비트가 2이면 H의 2번째를 인버팅해서 에러 만드는거지
  error_cycle <= sig_random(15 downto 12);
  if sig_random(15 downto 12) > e_prd then
     error_cycle <= sig_random(15 downto 12) - "0101";
  end if;

  errorbit <= sig_random(15 downto 13);
  errorH <= H;

  if num_cycle = error_cycle then
     if    (errorbit = "000") then errorH <= H;
     elsif (errorbit = "001") then errorH <= H; errorH(1) <= not H(1);
     elsif (errorbit = "010") then errorH <= H; errorH(2) <= not H(2);
     elsif (errorbit = "011") then errorH <= H; errorH(3) <= not H(3);
     elsif (errorbit = "100") then errorH <= H; errorH(4) <= not H(4);
     elsif (errorbit = "101") then errorH <= H; errorH(5) <= not H(5);
     elsif (errorbit = "110") then errorH <= H; errorH(6) <= not H(6);
     elsif (errorbit = "111") then errorH <= H; errorH(7) <= not H(7);
     end if;
  end if;
end process;

end behav;
